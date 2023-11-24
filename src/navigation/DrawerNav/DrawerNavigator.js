import React from 'react';
import Icons from 'react-native-vector-icons/MaterialIcons';
import CustomDrawer from './CustomDrawer';
import AboutUsScreen from '../../screens/drawerNavScreens/AboutUsScreen';
import FAQScreen from '../../screens/drawerNavScreens/FAQScreen';
import SettingsScreen from '../../screens/drawerNavScreens/SettingsScreen';
import SupportScreen from '../../screens/drawerNavScreens/SupportScreen';
import LoginScreen from '../../screens/onBoardingScreens/LoginScreen';
import DetailsScreen from '../../screens/drawerNavScreens/DetailsScreen';
import SurveyScreen from '../../screens/drawerNavScreens/SurveyScreen';
import {BottomTabNavigator} from '../BottomTabNavigator';
import theme from '../../constants/theme';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
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
          if (route.name === 'About') {
            iconName = 'info';
          } else if (route.name === 'FAQ') {
            iconName = 'question-answer';
          } else if (route.name === 'Support') {
            iconName = 'phone';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          } else if (route.name === 'Details') {
            iconName = 'token';
          } else if (route.name === 'Survey') {
            iconName = 'note';
          }
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
        name="About"
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
      <Drawer.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          drawerLabel: 'Details',
        }}
      />
      <Drawer.Screen
        name="Survey"
        component={SurveyScreen}
        options={{
          drawerLabel: 'Survey',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
