import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import theme from '../../constants/theme';
import dataJSON from '../../../data.json';
const RatingPicker = ({onOptionPress}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = dataJSON.questions[10].options;

  const handleOptionPressInternal = option => {
    setSelectedOption(option);
    onOptionPress(option);
  };

  const renderOption = (option, label) => (
    <TouchableOpacity onPress={() => handleOptionPressInternal(option)}>
      <View
        style={{
          backgroundColor:
            selectedOption === option
              ? theme.backgroundColor.orangeCoral
              : theme.backgroundColor.white,
          borderWidth: 2,
          borderColor:
            selectedOption === option
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
              selectedOption === option
                ? theme.backgroundColor.white
                : theme.fontColors.gray,
            fontWeight: 'bold',
          }}>
          {option}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      {options.map(option => renderOption(option))}
    </View>
  );
};

export default RatingPicker;
