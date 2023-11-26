import React, {useState, useRef, useEffect} from 'react';
import {View, FlatList, Text, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import {PermissionsAndroid} from 'react-native';
import {
  removeFromCartAction,
  clearCart,
  increaseQuantityAction,
  decreaseQuantityAction,
} from '../../../redux/actions/authAction';
import theme from '../../../constants/theme';
import {Background} from '../../../components/Background/Background';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import CartItem from '../../../components/CartItem/CartItem';
import {styles} from './styles';

import {analytics} from '../../../database/firebaseConfig';

const CartScreen = () => {
  const cartItems = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();
  const viewShotRef = useRef();
  const [cartHeight, setCartHeight] = useState(0);

  const logEvent = async (eventName, eventParams) => {
    try {
      await analytics.logEvent(eventName, eventParams);
      console.log('Event logged successfully:', eventName, eventParams);
    } catch (error) {
      console.error('Error logging event:', error);
    }
  };

  const calculateTotalPrice = cartItems => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice.toFixed(2);
  };

  const handleRemoveItem = itemId => {
    logEvent('remove_item', {itemId});
    dispatch(removeFromCartAction({id: itemId}));
  };

  const handleIncreaseQuantity = itemId => {
    dispatch(increaseQuantityAction({id: itemId}));
    logEvent('increase_quantity', {itemId});
  };

  const handleDecreaseQuantity = itemId => {
    dispatch(decreaseQuantityAction({id: itemId}));
    logEvent('decrease_quantity', {itemId});
  };

  const totalCartPrice = calculateTotalPrice(cartItems);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleTakeScreenshot = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to save screenshots.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        if (viewShotRef.current) {
          const uri = await viewShotRef.current.capture(viewShotRef, {
            format: 'jpg',
            quality: 0.9,
            result: 'data-uri',
          });
          const imagePath = `${RNFS.ExternalDirectoryPath}/screenshot.jpg`;
          await RNFS.moveFile(uri, imagePath);
          Alert.alert('Screenshot Saved', `Screenshot saved to ${imagePath}`);
          console.log('Screenshot Saved', `Screenshot saved to ${imagePath}`);
        } else {
          console.error('viewShotRef.current is not defined.');
        }
      } else {
        console.log('Storage permission denied');
      }
    } catch (error) {
      console.error('Error capturing or saving screenshot:', error);
    }
  };

  // Split cart items into two arrays
  const midIndex = Math.ceil(cartItems.length / 2);
  const firstHalf = cartItems.slice(0, midIndex);
  const secondHalf = cartItems.slice(midIndex);

  return (
    <ViewShot
      ref={viewShotRef}
      options={{format: 'jpg', quality: 0.9}}
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
      }}>
      <View style={styles.container}>
        <Background />
        <View style={styles.header}>
          {/* <Text style={styles.totalPrice}>{strings.totalPrice}</Text> */}
          <Text style={styles.totalPrice}>${totalCartPrice}</Text>
          <View style={styles.icons}>
            <TouchableOpacity onPress={handleClearCart}>
              <Icon name="trash" size={20} color={theme.fontColors.black} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleTakeScreenshot}
              style={styles.screenShot}>
              <Icon name="camera" size={20} color={theme.fontColors.black} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.list}>
          {firstHalf.length > 0 && (
            <FlatList
              data={firstHalf}
              keyExtractor={item => item.id.toString()}
              renderItem={({item, index}) => {
                const containerHeight = index % 2 === 0 ? 250 : 150;

                return (
                  <CartItem
                    item={item}
                    index={index}
                    increaseQuantity={handleIncreaseQuantity}
                    decreaseQuantity={handleDecreaseQuantity}
                    containerHeight={containerHeight}
                    removeItem={handleRemoveItem}
                    midIndex={midIndex}
                  />
                );
              }}
              onContentSizeChange={(contentWidth, contentHeight) => {
                setCartHeight(contentHeight);
              }}
              showsVerticalScrollIndicator={false}
            />
          )}

          {secondHalf.length > 0 && (
            <FlatList
              data={secondHalf}
              keyExtractor={item => item.id.toString()}
              renderItem={({item, index}) => {
                const containerHeight = index % 2 === 0 ? 150 : 250;

                return (
                  <CartItem
                    item={item}
                    index={index + midIndex}
                    increaseQuantity={handleIncreaseQuantity}
                    decreaseQuantity={handleDecreaseQuantity}
                    containerHeight={containerHeight}
                    removeItem={handleRemoveItem}
                    midIndex={midIndex}
                  />
                );
              }}
              onContentSizeChange={(contentWidth, contentHeight) => {
                setCartHeight(contentHeight);
              }}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </ViewShot>
  );
};

export default CartScreen;
