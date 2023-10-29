import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {styles} from './styles';
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

export default CustomButton;
