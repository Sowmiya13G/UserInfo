import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AboutUsScreen from '../../screens/drawerNavScreens/SurveyStack/AboutUsScreen';
import DetailsScreen from '../../screens/drawerNavScreens/SurveyStack/DetailsScreen';
import SurveyScreen from '../../screens/drawerNavScreens/SurveyStack/SurveyScreen';
import PreviewScreen from '../../screens/drawerNavScreens/SurveyStack/PreviewScreen';
const Stack = createStackNavigator();

export function SurveyStack() {
  return (
    <Stack.Navigator initialRouteName={AboutUsScreen}>
      <Stack.Screen
        name="AboutUsScreen"
        component={AboutUsScreen}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="SurveyScreen"
        component={SurveyScreen}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="PreviewScreen"
        component={PreviewScreen}
        options={{title: '', headerShown: false}}
      />
    </Stack.Navigator>
  );
}
