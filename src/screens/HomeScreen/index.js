import React, {useEffect} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Background} from '../../components/Background/Background';
import strings from '../../constants/strings';
import {styles} from './styles';
import {useSelector, useDispatch} from 'react-redux';
import {fetchProducts, addToCart} from '../../redux/actions/authAction';
import {connect} from 'react-redux';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authorizedPerson = useSelector(state => state.auth.authorizedPerson);
  console.log('Authorized Person:', authorizedPerson);

  const products = useSelector(state => state.products.products);
  console.log(products);
  const cart = useSelector(state => state.cart.cart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleAddToCart = product => {
    dispatch(addToCart(product));
  };

  const goToCart = () => {
    navigation.navigate('CartScreen');
  };
  return (
    <SafeAreaProvider>
      <Background />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{strings.heyUser}</Text>
          <View style={styles.header}>
            <TouchableOpacity onPress={goToCart} style={styles.cartToggle}>
              <Icon name="shopping-cart" size={30} color="white" />
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
              <Image source={{uri: item.image}} style={styles.productImage} />
              <View style={styles.details}>
                {/* <Text style={styles.productTitle}>{item.title}</Text> */}
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
    </SafeAreaProvider>
  );
};
export default HomeScreen;
