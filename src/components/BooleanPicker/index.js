import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import theme from '../../constants/theme';

const BooleanPicker = ({onOptionPress, selectedType}) => {
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
              selectedOption === true || selectedType
                ? theme.backgroundColor.orangeCoral
                : theme.backgroundColor.white,
            borderWidth: 2,
            borderColor:
              selectedOption === true || selectedType
                ? theme.backgroundColor.orange
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
                selectedOption === true || selectedType
                  ? theme.backgroundColor.white
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
                ? theme.backgroundColor.orangeCoral
                : theme.backgroundColor.white,
            borderWidth: 2,
            borderColor:
              selectedOption === false
                ? theme.backgroundColor.orange
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
                  ? theme.backgroundColor.white
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
