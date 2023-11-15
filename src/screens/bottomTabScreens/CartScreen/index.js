import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {styles} from './styles';
import strings from '../../../constants/strings';
import {useDispatch, useSelector} from 'react-redux';
import {
  removeFromCartAction,
  clearCart,
  increaseQuantityAction,
  decreaseQuantityAction,
} from '../../../redux/actions/authAction';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../../constants/theme';
import {Background} from '../../../components/Background/Background';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import {captureRef} from 'react-native-view-shot';
import CartItem from '../../../components/CartItem/CartItem';
export default function CartScreen() {
  const cartItems = useSelector(state => state.cart.cart);
  console.log('cart list', cartItems);
  const dispatch = useDispatch();
  const viewShotRef = useRef();
  const [cartHeight, setCartHeight] = useState(0);

  const calculateTotalPrice = cartItems => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice.toFixed(2);
  };

  const handleRemoveItem = itemId => {
    dispatch(removeFromCartAction({id: itemId}));
  };

  const handleIncreaseQuantity = itemId => {
    dispatch(increaseQuantityAction({id: itemId}));
  };

  const handleDecreaseQuantity = itemId => {
    dispatch(decreaseQuantityAction({id: itemId}));
  };
  const totalCartPrice = calculateTotalPrice(cartItems);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleTakeScreenshot = async () => {
    try {
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
    } catch (error) {
      console.error('Error capturing or saving screenshot:', error);
    }
  };
  return (
    <ViewShot
      ref={viewShotRef}
      options={{format: 'jpg', quality: 0.9}}
      style={{
        flex: 1,
        width: '100%',
        height: cartHeight,
      }}>
      <View style={styles.container}>
        <Background />
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClearCart} style={styles.clearCart}>
            <Icon name="trash" size={20} color={theme.fontColors.black} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleTakeScreenshot}>
            <Icon name="camera" size={20} color={theme.fontColors.black} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={cartItems}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => {
            const containerHeight =
              index % 4 === 0 || index % 4 === 3 ? 150 : 200;

            return (
              <CartItem
                item={item}
                index={index}
                increaseQuantity={handleIncreaseQuantity}
                decreaseQuantity={handleDecreaseQuantity}
                containerHeight={containerHeight}
                removeItem={handleRemoveItem}
              />
            );
          }}
          onContentSizeChange={(contentWidth, contentHeight) => {
            setCartHeight(contentHeight);
          }}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPrice}>{strings.totalPrice}</Text>
          <Text style={styles.totalPrice}>${totalCartPrice}</Text>
        </View>
      </View>
    </ViewShot>
  );
}

{
  /* <TouchableOpacity
style={styles.removeButton}
onPress={() => handleRemoveItem(item.id)}>
<Text style={styles.removeButtonText}>Remove</Text>
</TouchableOpacity> */
}

// const contentHeight = viewShotRef.current?._lastContentHeight || 0;
// const uri = await viewShotRef.current.capture({
//   format: 'jpg',
//   quality: 0.9,
//   height: contentHeight,
//   snapshotContentContainer: true,
// });
