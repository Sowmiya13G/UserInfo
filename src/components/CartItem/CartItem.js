import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const CartItem = ({
  item,
  index,
  increaseQuantity,
  decreaseQuantity,
  containerHeight,
  removeItem,
}) => {
  const containerStyle = {
    ...styles.productContainer,
    height: containerHeight,
    marginTop: index % 2 === 0 ? 0 : 5,
    marginBottom: 5,
  };

  return (
    <View style={containerStyle}>
      <Image source={{uri: item.image}} style={styles.productImage} />
      <View style={styles.details}>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeItem(item.id)}>
          <Icon name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;
