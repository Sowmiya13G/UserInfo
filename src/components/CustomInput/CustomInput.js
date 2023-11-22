import React from 'react';
import {View, TextInput} from 'react-native';
import {styles} from './styles';
import theme from '../../constants/theme';
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
        placeholderTextColor={theme.fontColors.inkLight}
        keyboardType={keyboardType}
        // value={Array.isArray(value) ? value.join(', ') : value}
      />
    </View>
  );
};
