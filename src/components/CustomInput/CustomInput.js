import React from 'react';
import {View, TextInput} from 'react-native';
import {styles} from './styles';
export const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#697D95"
        keyboardType={keyboardType}
      />
    </View>
  );
};
