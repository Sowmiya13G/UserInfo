import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Background} from '../../../../components/Background/Background';
import strings from '../../../../constants/strings';
import {styles} from './styles';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchProducts,
  addToCartAction,
  addToWishlistAction,
  increaseQuantityAction,
  removeFromWishlistAction,
} from '../../../../redux/actions/authAction';
import {analytics} from '../../../../database/firebaseConfig';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../../../constants/theme';
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authorizedPerson = useSelector(state => state.auth.authorizedPerson);
  console.log('Authorized Person:', authorizedPerson);

  const products = useSelector(state => state.auth.products);
  // console.log('PRODUCTS??????', products);
  const cart = useSelector(state => state.cart.cart);
  // console.log('cart', cart);
  const wishlist = useSelector(state => state.auth.wishlist);
  // console.log('wishlist', wishlist);
  const isProductInWishlist = productId => {
    return wishlist ? wishlist.some(item => item.id === productId) : false;
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleAddToCart = product => {
    const existingProduct =
      cart.length && cart.find(item => item.id === product.id);
    if (existingProduct) {
      dispatch(increaseQuantityAction({id: product.id}));
    } else {
      dispatch(addToCartAction(product));
      const event = analytics.logEvent('add_to_cart', {
        productId: product.id,
        productName: product.name,
        price: product.price,
      });
      console.log('event', event);
      console.log('product', product);
    }
  };

  const goToCart = () => {
    navigation.navigate('Cart');
    navigation.setOptions({
      tabBarVisible: true,
    });
  };

  const handleToggleWishlist = product => {
    const isInWishlist = isProductInWishlist(product.id);
    if (isInWishlist) {
      dispatch(removeFromWishlistAction(product.id));
    } else {
      dispatch(addToWishlistAction(product));
    }
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

// const handleAddToCart = product => {
//   console.log('PRODUCT>..........', product);
//   try {
//     if (!cart) {
//       console.error('Cart is undefined or null:', cart);
//       return;
//     }

//     const existingProduct =
//       cart.length && cart.find(item => item.id === product.id);

//     if (existingProduct) {
//       dispatch(increaseQuantityAction({id: product.id}));
//     } else {
//       dispatch(addToCartAction(product));
//       // const productID = product.id;
//       // ToastAndroid.show(`${productID}`, ToastAndroid.SHORT);
//       // const event = analytics.logEvent('add_to_cart', {
//       //   productId: product.id,
//       //   productName: product.name,
//       //   price: product.price,
//       // });
//       // console.log('event', event);
//       console.log('product', product);
//     }
//   } catch (error) {
//     console.error('Error in handleAddToCart:', error);
//   }
// };
