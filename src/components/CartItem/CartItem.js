import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../constants/theme';
const CartItem = ({
  item,
  index,
  increaseQuantity,
  decreaseQuantity,
  containerHeight,
  removeItem,
  midIndex,
}) => {
  const containerStyle = {
    ...styles.productContainer,
    height: containerHeight,
    marginTop: index % 2 === 0 ? 0 : 5,
  };

  const calculateImageSize = () => {
    let imageHeight;
    if (index % 2 === 0) {
      if (index < midIndex) {
        imageHeight = containerHeight * 0.5;
      } else {
        imageHeight = containerHeight * 0.4;
      }
    } else {
      if (index < midIndex) {
        imageHeight = containerHeight * 0.4;
      } else {
        imageHeight = containerHeight * 0.5;
      }
    }
    return {
      height: imageHeight,
      width: '80%',
      paddingTop: '2%',
    };
  };

  const imageStyle = calculateImageSize();
  return (
    <View style={containerStyle}>
      <Image
        source={{uri: item.image}}
        style={imageStyle}
        resizeMode="contain"
      />
      <Text style={styles.productPrice}>${item.price}</Text>
      <View style={styles.options}>
        <TouchableOpacity onPress={() => removeItem(item.id)}>
          <Icon name="trash" size={23} color="black" />
        </TouchableOpacity>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
            <Icon name="minus" size={18} color={theme.fontColors.candyBlue} />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
            <Icon name="plus" size={18} color={theme.fontColors.candyBlue} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
