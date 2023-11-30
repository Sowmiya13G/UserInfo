import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import theme from '../../constants/theme';

const MultiChoicePicker = ({options, onOptionPress, selectedChoice = []}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionPressInternal = option => {
    let updatedSelectedOptions;

    if (selectedOptions.includes(option)) {
      updatedSelectedOptions = selectedOptions.filter(
        selected => selected !== option,
      );
    } else {
      updatedSelectedOptions = [...selectedOptions, option];
    }

    setSelectedOptions(updatedSelectedOptions);
    onOptionPress(updatedSelectedOptions);
  };
  console.log('selectedChoice', selectedChoice);

  useEffect(() => {
    // setSelectedOptions(selectedChoice);
    if (Array.isArray(selectedChoice)) {
      setSelectedOptions(selectedChoice);
    }
  }, [selectedChoice]);
  return (
    <View
      style={{
        flex: 1,
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleOptionPressInternal(option)}>
          <View
            style={{
              backgroundColor:
                selectedOptions.includes(option) ||
                selectedChoice.includes(option)
                  ? theme.backgroundColor.orangeCoral
                  : theme.backgroundColor.white,
              borderWidth: 2,
              borderColor:
                selectedOptions.includes(option) ||
                selectedChoice.includes(option)
                  ? theme.backgroundColor.orange
                  : theme.backgroundColor.borderGray,
              borderRadius: 5,
              padding: 10,
              margin: 10,
              alignItems: 'center',
              width: 90,
            }}>
            <Text
              style={{
                color:
                  selectedOptions.includes(option) ||
                  selectedChoice.includes(option)
                    ? theme.backgroundColor.white
                    : theme.fontColors.gray,
                fontWeight: 'bold',
              }}>
              {option}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MultiChoicePicker;
