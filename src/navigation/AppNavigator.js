import {valuePacker} from 'react-native-reanimated';
// import 'react-native-reanimated';
import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {StatusBar, View} from 'react-native';
import OnboardingScreen from '../screens/onBoardingScreens/onBoardingScreen';
import LoginScreen from '../screens/onBoardingScreens/LoginScreen';
import FirebaseLoginScreen from '../screens/onBoardingScreens/FirebaseLoginScreen/FirebaseLoginScreen';
import SignUpScreen from '../screens/onBoardingScreens/SignUpScreen';
import {BottomTabNavigator} from './BottomTabNavigator';
const Stack = createStackNavigator();

const AppNavigator = () => {
  const user = auth().currentUser;
  console.log('user', user);

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
            component={BottomTabNavigator}
            options={{title: '', headerShown: false}}
          />
          <Stack.Screen
            name="FirebaseLoginScreen"
            component={FirebaseLoginScreen}
            options={{title: '', headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default AppNavigator;
