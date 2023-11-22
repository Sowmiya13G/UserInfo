import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/bottomTabScreens/HomeScreen';
import CartScreen from '../screens/OtherScreens/CartScreen';
import TabViewScreen from '../screens/bottomTabScreens/TabViewScreen';
import WishListScreen from '../screens/bottomTabScreens/WishListScreen';
import ProfileScreen from '../screens/bottomTabScreens/ProfileScreen';
import theme from '../constants/theme';
const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.backgroundColor.orange,
        tabBarInactiveTintColor: theme.backgroundColor.white,

        tabBarStyle: {
          backgroundColor: theme.backgroundColor.secondaryBlack,
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          position: 'absolute',
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={({route}) => ({
          tabBarLabel: 'Home',
          title: '',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
          tabBarVisible: route.state ? route.state.index === 0 : true,
        })}></Tab.Screen>
      <Tab.Screen
        name="ViewTab"
        component={TabViewScreen}
        options={{
          tabBarLabel: 'Tabs',
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
          tabBarLabel: 'WishList',
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
          tabBarLabel: 'Profile',
          title: '',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="user-circle-o" size={size} color={color} />
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};
