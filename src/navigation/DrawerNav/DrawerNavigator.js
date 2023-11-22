import React from 'react';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import AboutUsScreen from '../../screens/drawerNavScreens/AboutUsScreen/AboutUsScreen';
import FAQScreen from '../../screens/drawerNavScreens/FAQAScreen';
import SettingsScreen from '../../screens/drawerNavScreens/SettingsScreen/SettingsScreen';
import SupportScreen from '../../screens/drawerNavScreens/SupportScreen/SupportScreen';
import LoginScreen from '../../screens/onBoardingScreens/LoginScreen';
import {BottomTabNavigator} from '../BottomTabNavigator';

import theme from '../../constants/theme';

const Drawer = createDrawerNavigator();
export const DrawerNavigator = navigation => {
  return (
    <Drawer.Navigator
      initialRouteName="BottomTabBar"
      drawerContent={props => <CustomDrawer {...props} />}
      article
      receipt-long
      screenOptions={({route}) => ({
        headerShown: false,
        drawerActiveBackgroundColor: 'transparent',
        drawerActiveTintColor: theme.fontColors.orange,
        drawerInactiveTintColor: theme.fontColors.black,
        drawerLabelStyle: {marginLeft: -20, fontSize: 18},
        drawerStyle: {width: theme.screenWidth},
        drawerIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'About Us') {
            iconName = 'info';
          } else if (route.name === 'FAQ') {
            iconName = 'question-answer';
          } else if (route.name === 'Support') {
            iconName = 'phone';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }
          // else if (route.name === 'LogIn') {
          //   iconName = 'logout';
          // }
          return <Icons name={iconName} size={size} color={color} />;
        },
      })}>
      <Drawer.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{
          title: '',
        }}
      />
      <Drawer.Screen
        name="About Us"
        component={AboutUsScreen}
        options={{
          drawerLabel: 'About Us',
        }}
      />
      <Drawer.Screen
        name="FAQ"
        component={FAQScreen}
        options={{
          drawerLabel: 'FAQ',
        }}
      />
      <Drawer.Screen
        name="Support"
        component={SupportScreen}
        options={{
          drawerLabel: 'Support',
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerLabel: 'Settings',
        }}
      />
      {/* <Drawer.Screen
        name="LogIn"
        component={LoginScreen}
        options={{
          title: 'LogIn',
          drawerLabel: 'Log-Out',
        }}
        onPress={() => {
          handleLogout(navigation);
        }}
      /> */}
    </Drawer.Navigator>
  );
};
