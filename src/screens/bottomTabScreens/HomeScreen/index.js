import React, {useEffect} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Background} from '../../../components/Background/Background';
import strings from '../../../constants/strings';
import {styles} from './styles';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchProducts,
  addToCartAction,
  addToWishlistAction,
  increaseQuantityAction,
  removeFromWishlistAction,
} from '../../../redux/actions/authAction';

import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../../constants/theme';
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authorizedPerson = useSelector(state => state.auth.authorizedPerson);
  console.log('Authorized Person:', authorizedPerson);

  const products = useSelector(state => state.products.products);
  const cart = useSelector(state => state.cart.cart);
  console.log(cart);
  const wishlist = useSelector(state => state.auth.wishlist);
  console.log('wishlist', wishlist);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleAddToCart = product => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      dispatch(increaseQuantityAction({id: product.id}));
    } else {
      dispatch(addToCartAction(product));
      console.log('product', product);
    }
  };

  const goToCart = () => {
    navigation.navigate('CartTab');
  };

  const handleToggleWishlist = product => {
    const isInWishlist = isProductInWishlist(product.id);
    if (isInWishlist) {
      dispatch(removeFromWishlistAction(product.id));
    } else {
      dispatch(addToWishlistAction(product));
    }
  };

  const isProductInWishlist = productId => {
    return wishlist ? wishlist.some(item => item.id === productId) : false;
  };

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.header}>
        <Text style={styles.title}>{strings.heyUser}</Text>
        <View style={styles.header}>
          <TouchableOpacity onPress={goToCart} style={styles.cartToggle}>
            <Icon
              name="shopping-cart"
              size={30}
              color={theme.fontColors.black}
            />
            {cart.length > 0 && (
              <Text style={styles.cartCount}>{cart.length}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.productContainer}>
            <TouchableOpacity
              onPress={() => handleToggleWishlist(item)}
              style={styles.wishList}>
              <Icon
                name={isProductInWishlist(item.id) ? 'heart' : 'heart-o'}
                size={20}
                color={isProductInWishlist(item.id) ? 'red' : 'black'}
              />
            </TouchableOpacity>
            <Image source={{uri: item.image}} style={styles.productImage} />
            <View style={styles.details}>
              <Text style={styles.productPrice}>${item.price}</Text>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => handleAddToCart(item)}>
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
export default HomeScreen;
