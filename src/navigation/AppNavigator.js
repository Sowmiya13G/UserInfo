import {valuePacker} from 'react-native-reanimated';
// import 'react-native-reanimated';
import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {StatusBar, View} from 'react-native';
import OnboardingScreen from '../screens/onBoardingScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import CartScreen from '../screens/cartScreen';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#FFD7B4" barStyle="dark-content" />

      <NavigationContainer>
        <Stack.Navigator initialRouteName="OnboardingScreen">
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
            component={HomeScreen}
            options={{title: '', headerShown: false}}
          />
          <Stack.Screen
            name="CartScreen"
            component={CartScreen}
            options={{title: '', headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default AppNavigator;
