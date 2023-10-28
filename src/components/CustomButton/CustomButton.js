import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const CustomButton = ({
  logInButton,
  label = '',
  optionButton,
  handlePress = () => {},
}) => {
  return (
    <View>
      <TouchableOpacity
        style={
          logInButton
            ? styles.logInButton
            : optionButton
            ? styles.optionButton
            : ''
        }
        onPress={handlePress}>
        <Text
          style={
            logInButton
              ? styles.logInButtonText
              : optionButton
              ? styles.optionButtonText
              : ''
          }>
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  logInButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    marginBottom: 20,
    backgroundColor: '#292929',
  },
  optionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 20,
    borderColor: '#292929',
    borderWidth: 2,
  },
  logInButtonText: {
    color: '#fff',
  },
  optionButtonText: {
    color: '#292929',
  },
});

export default CustomButton;
