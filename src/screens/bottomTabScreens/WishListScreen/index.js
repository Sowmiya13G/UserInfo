// WishlistScreen.js
import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles'; // Import your styles
import {Background} from '../../../components/Background/Background';

const WishlistScreen = () => {
  const wishlist = useSelector(state => state.wishlist.wishlist);
  const products = useSelector(state => state.products.products);

  const getWishlistProducts = () => {
    return products.filter(product => wishlist.includes(product.id));
  };

  return (
    <View style={styles.container}>
      <Background />
      <Text style={styles.title}>Wishlist</Text>
      {wishlist.length === 0 ? (
        <Text>Your wishlist is empty</Text>
      ) : (
        <FlatList
          data={getWishlistProducts()}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.productContainer}>
              <Image source={{uri: item.image}} style={styles.productImage} />
              <View style={styles.details}>
                <Text style={styles.productPrice}>${item.price}</Text>
                <TouchableOpacity style={styles.addToCartButton}>
                  <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default WishlistScreen;
