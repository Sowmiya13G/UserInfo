import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import theme from '../../constants/theme';
import {useSelector} from 'react-redux';

const MultiChoiceField = ({options, onOptionPress}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const reduxSelectedOptions = useSelector(
    state => state.user.multiChoiceOptions,
  );
  console.log(reduxSelectedOptions);

  useEffect(() => {
    setSelectedOptions(reduxSelectedOptions || []);
  }, [reduxSelectedOptions]);

  const handleOptionPressInternal = option => {
    let updatedOptions;

    if (option === 'None of the Above') {
      updatedOptions = ['None of the Above'];
    } else {
      if (selectedOptions.includes('None of the Above')) {
        updatedOptions = [option];
      } else {
        if (selectedOptions.includes(option)) {
          updatedOptions = selectedOptions.filter(
            selectedOption => selectedOption !== option,
          );
        } else {
          updatedOptions = [...selectedOptions, option];
        }
      }
    }

    setSelectedOptions(updatedOptions);
    onOptionPress(updatedOptions);
  };

  return (
    <View
      style={{
        flex: 1,
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      {options && options.length > 0 ? (
        options.map(option => (
          <TouchableOpacity
            key={option}
            onPress={() => handleOptionPressInternal(option)}
            disabled={
              selectedOptions.includes('None of the Above') &&
              option !== 'None of the Above'
            }>
            <View
              style={{
                backgroundColor: selectedOptions.includes(option)
                  ? theme.backgroundColor.orangeCoral
                  : theme.backgroundColor.white,
                borderWidth: 2,
                borderColor: selectedOptions.includes(option)
                  ? theme.backgroundColor.orange
                  : theme.backgroundColor.borderGray,
                borderRadius: 5,
                padding: 10,
                margin: 10,
                alignItems: 'center',
                width: 60,
                opacity: selectedOptions.includes('None of the Above')
                  ? option === 'None of the Above'
                    ? 1
                    : 0.5
                  : 1,
              }}>
              <Text
                style={{
                  color: selectedOptions.includes(option)
                    ? theme.backgroundColor.white
                    : theme.fontColors.gray,
                  fontWeight: 'bold',
                }}>
                {option}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text>No options available</Text>
      )}
    </View>
  );
};

export default MultiChoiceField;
