import {valuePacker} from 'react-native-reanimated';
// import 'react-native-reanimated';
import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {StatusBar, View, Linking} from 'react-native';
import OnboardingScreen from '../screens/onBoardingScreens/onBoardingScreen';
import LoginScreen from '../screens/onBoardingScreens/LoginScreen';
import FirebaseLoginScreen from '../screens/onBoardingScreens/FirebaseLoginScreen/FirebaseLoginScreen';
import SignUpScreen from '../screens/onBoardingScreens/SignUpScreen';
import DrawerNavigator from './DrawerNav/DrawerNavigator';
import {authFirebase} from '../database/firebaseConfig';
import CartScreen from '../screens/bottomTabScreens/HomeStack/CartScreen';
import NotificationScreen from '../screens/bottomTabScreens/TabScreenStack/NotificationScreen';
import analytics from '@react-native-firebase/analytics';
import {
  getFCMToken,
  requestUserPermission,
  setupFCMListener,
} from '../utils/fcmService';
import messaging from '@react-native-firebase/messaging';
import {handleDynamicLink} from '../utils/dynamicLinking';
import {deepLink} from '../utils/dynamicLinking';
const Stack = createStackNavigator();

const AppNavigator = () => {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  const user = auth().currentUser;
  console.log('user', user);

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  useEffect(() => {
    initializeFirebaseMessaging();
    deepLink();
    handleDynamicLink();
  }, []);
  const initializeFirebaseMessaging = async () => {
    authFirebase;
    await messaging().registerDeviceForRemoteMessages();
    await getFCMToken();
    await requestUserPermission();
    await setupFCMListener();
  };
  const initialScreen = user ? 'HomeScreen' : 'OnboardingScreen';
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#FFD7B4" barStyle="dark-content" />

      <NavigationContainer
        linking={Linking}
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.current.getCurrentRoute().name;
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current.getCurrentRoute().name;

          if (previousRouteName !== currentRouteName) {
            await analytics().logScreenView({
              screen_name: currentRouteName,
              screen_class: currentRouteName,
            });
          }
          routeNameRef.current = currentRouteName;
        }}>
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
