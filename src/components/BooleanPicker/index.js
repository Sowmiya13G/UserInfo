import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import theme from '../../constants/theme';

const BooleanPicker = ({onOptionPress}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionPressInternal = option => {
    setSelectedOption(option);
    onOptionPress(option);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleOptionPressInternal(true)}>
        <View
          style={{
            backgroundColor:
              selectedOption === true
                ? theme.backgroundColor.lightBlue
                : theme.backgroundColor.white,
            borderWidth: 2,
            borderColor:
              selectedOption === true
                ? theme.backgroundColor.blueShade
                : theme.backgroundColor.borderGray,
            borderRadius: 5,
            padding: 10,
            margin: 10,
            alignItems: 'center',
            width: 100,
          }}>
          <Text
            style={{
              color:
                selectedOption === true
                  ? theme.backgroundColor.blueShade
                  : theme.fontColors.gray,
              fontWeight: 'bold',
            }}>
            Yes
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleOptionPressInternal(false)}>
        <View
          style={{
            backgroundColor:
              selectedOption === false
                ? theme.backgroundColor.lightBlue
                : theme.backgroundColor.white,
            borderWidth: 2,
            borderColor:
              selectedOption === false
                ? theme.backgroundColor.blueShade
                : theme.backgroundColor.borderGray,
            borderRadius: 5,
            padding: 10,
            margin: 10,
            width: 100,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color:
                selectedOption === false
                  ? theme.backgroundColor.blueShade
                  : theme.fontColors.gray,
              fontWeight: 'bold',
            }}>
            No
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BooleanPicker;
