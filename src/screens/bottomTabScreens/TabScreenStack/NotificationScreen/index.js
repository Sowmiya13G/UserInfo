import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {Background} from '../../../../components/Background/Background';
export default function NotificationScreen() {
  const navigation = useNavigation();
  const goToProfile = () => {
    navigation.navigate('ProfileTab');
  };
  return (
    <View>
      <Background />
      <TouchableOpacity onPress={goToProfile}>
        <Text>GOTOPROFILE</Text>
      </TouchableOpacity>
    </View>
  );
}
