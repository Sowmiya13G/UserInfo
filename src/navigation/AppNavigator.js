import {valuePacker} from 'react-native-reanimated';
// import 'react-native-reanimated';
import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {StatusBar, View} from 'react-native';
import OnboardingScreen from '../screens/onBoardingScreens/onBoardingScreen';
import LoginScreen from '../screens/onBoardingScreens/LoginScreen';
import FirebaseLoginScreen from '../screens/onBoardingScreens/FirebaseLoginScreen/FirebaseLoginScreen';
import SignUpScreen from '../screens/onBoardingScreens/SignUpScreen';
import {BottomTabNavigator} from './BottomTabNavigator';
import {DrawerNavigator} from './DrawerNav/DrawerNavigator';
import {authFirebase} from '../database/firebaseConfig';
import CartScreen from '../screens/OtherScreens/CartScreen';
import NotificationScreen from '../screens/OtherScreens/NotificationScreen';
const Stack = createStackNavigator();

const AppNavigator = () => {
  const user = auth().currentUser;
  console.log('user', user);
  useEffect(() => {
    authFirebase;
  });
  const initialScreen = user ? 'HomeScreen' : 'OnboardingScreen';
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#FFD7B4" barStyle="dark-content" />

      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialScreen}>
          <Stack.Screen
            name="OnboardingScreen"
            component={OnboardingScreen}
            options={{title: '', headerShown: false}}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{title: '', headerShown: false}}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{title: '', headerShown: false}}
          />
          <Stack.Screen
            name="HomeScreen"
            component={DrawerNavigator}
            options={{title: '', headerShown: false}}
          />
          <Stack.Screen
            name="FirebaseLoginScreen"
            component={FirebaseLoginScreen}
            options={{title: '', headerShown: false}}
          />
          <Stack.Screen
            name="CartScreen"
            component={CartScreen}
            options={{title: '', headerShown: false}}
          />
          <Stack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default AppNavigator;
