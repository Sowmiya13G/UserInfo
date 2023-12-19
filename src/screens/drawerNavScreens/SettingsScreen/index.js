import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

// Components
import {Background} from '../../../components/Background/Background';

export default function SettingsScreen() {
  // Render UI .........................
  return (
    <View>
      <Background />
      <Text>SettingsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
