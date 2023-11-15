import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {removeFromWishlistAction} from '../../../redux/actions/authAction';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Background} from '../../../components/Background/Background';

const WishlistScreen = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist.wishlist);

  const handleRemoveFromWishlist = productId => {
    dispatch(removeFromWishlistAction(productId));
  };
  const isProductInWishlist = productId =>
    wishlist.some(item => item.id === productId);

  return (
    <View style={styles.container}>
      <Background />
      <Text style={styles.title}>Wishlist</Text>
      {wishlist.length === 0 ? (
        <Text>Your wishlist is empty</Text>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item, index) =>
            item && item.id ? item.id.toString() : `no-id-${index}`
          }
          renderItem={({item}) =>
            item ? (
              <View style={styles.productContainer}>
                <Image source={{uri: item.image}} style={styles.productImage} />
                <View style={styles.details}>
                  <Text style={styles.productPrice}>${item.price}</Text>
                  <TouchableOpacity
                    style={styles.wishListIcon}
                    onPress={() => handleRemoveFromWishlist(item.id)}>
                    <Icon
                      name={isProductInWishlist(item.id) ? 'heart' : 'heart-o'}
                      size={20}
                      color={isProductInWishlist(item.id) ? 'red' : 'black'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : null
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default WishlistScreen;
