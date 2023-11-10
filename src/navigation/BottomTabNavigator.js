import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/bottomTabScreens/HomeScreen';
import CartScreen from '../screens/bottomTabScreens/CartScreen';
import WishListScreen from '../screens/bottomTabScreens/WishListScreen';
import ProfileScreen from '../screens/bottomTabScreens/ProfileScreen';
import theme from '../constants/theme';
const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.backgroundColor.orange,
        tabBarStyle: {
          backgroundColor: theme.backgroundColor.white,
          position: 'absolute',
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          title: '',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{
          tabBarLabel: 'Price',
          title: '',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="tags" size={size} color={color} />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="WishListTab"
        component={WishListScreen}
        options={{
          tabBarLabel: 'Price',
          title: '',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="heart" size={size} color={color} />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Price',
          title: '',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="user-circle-o" size={size} color={color} />
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};
