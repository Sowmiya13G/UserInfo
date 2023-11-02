import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import strings from '../../constants/strings';
import {useDispatch, useSelector} from 'react-redux';
import {
  removeFromCart,
  clearCart,
  increaseQuantityAction,
  decreaseQuantityAction,
} from '../../redux/actions/authAction';
import {Background} from '../../components/Background/Background';

export default function CartScreen() {
  const cartItems = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();

  const calculateTotalPrice = cartItems => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice.toFixed(2);
  };

  const handleRemoveItem = itemId => {
    dispatch(removeFromCart({id: itemId}));
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

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.header}>
        <Text style={styles.title}>{strings.yourCart}</Text>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPrice}>{strings.totalPrice}</Text>
          <Text style={styles.totalPrice}>${totalCartPrice}</Text>
        </View>
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          if (item.quantity > 0) {
            return (
              <View style={styles.productContainer}>
                <Image source={{uri: item.image}} style={styles.productImage} />
                <View style={styles.details}>
                  <Text style={styles.productTitle}>{item.title}</Text>
                  <Text style={styles.productPrice}>${item.price}</Text>
                </View>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleDecreaseQuantity(item.id)}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => handleIncreaseQuantity(item.id)}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                {/* <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveItem(item.id)}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity> */}
              </View>
            );
          } else {
            return null;
          }
        }}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity
        onPress={handleClearCart}
        style={styles.clearCartButton}>
        <Text style={styles.clearCartButtonText}>Clear Cart</Text>
      </TouchableOpacity>
    </View>
  );
}
