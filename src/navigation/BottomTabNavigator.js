import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/bottomTabScreens/HomeStack/HomeScreen';
import CartScreen from '../screens/bottomTabScreens/HomeStack/CartScreen';
import TabViewScreen from '../screens/bottomTabScreens/TabScreenStack/TabViewScreen';
import WishListScreen from '../screens/bottomTabScreens/WishListScreen';
import ProfileScreen from '../screens/bottomTabScreens/ProfileScreen';
import theme from '../constants/theme';
import NotificationScreen from '../screens/bottomTabScreens/TabScreenStack/NotificationScreen';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarVisible: route.params?.tabBarVisible ?? true,
        tabBarActiveTintColor: theme.backgroundColor.orange,
        tabBarInactiveTintColor: theme.backgroundColor.white,
        default: true,
        tabBarStyle: {
          backgroundColor: theme.backgroundColor.secondaryBlack,
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          position: 'absolute',
          height: '8.5%',
          alignItems: 'center',
          justifyContent: 'center',
        },
      })}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={({route}) => ({
          title: '',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <Icon name="home" size={focused ? 35 : 25} color={color} />
          ),
          tabBarVisible: route.state ? route.state.index === 0 : true,
        })}
      />
      <Tab.Screen
        name="ViewTab"
        component={TabViewStack}
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <Icon name="tags" size={focused ? 35 : 25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="WishListTab"
        component={WishListScreen}
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <Icon name="heart" size={focused ? 35 : 25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <Icon name="user-circle-o" size={focused ? 35 : 25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export function HomeStack() {
  return (
    <Stack.Navigator initialRouteName={HomeScreen}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{title: '', headerShown: false}}
      />
    </Stack.Navigator>
  );
}
export function TabViewStack() {
  return (
    <Stack.Navigator initialRouteName={TabViewScreen}>
      <Stack.Screen
        name="Home"
        component={TabViewScreen}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{title: '', headerShown: false}}
      />
    </Stack.Navigator>
  );
}
