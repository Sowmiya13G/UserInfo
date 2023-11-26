import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import theme from '../../constants/theme';
import {useSelector} from 'react-redux';

const MultiChoiceField = ({options, onOptionPress, selectedOptions}) => {
  const [internalSelectedOptions, setInternalSelectedOptions] = useState([]);

  const reduxSelectedOptions = useSelector(
    state => state.user.multiChoiceOptions,
  );

  useEffect(() => {
    setInternalSelectedOptions(selectedOptions || reduxSelectedOptions || []);
  }, [selectedOptions, reduxSelectedOptions]);

  const handleOptionPressInternal = option => {
    let updatedOptions;
    console.log('Selected Option:', option);
    if (option === 'None of the Above') {
      updatedOptions = ['None of the Above'];
    } else {
      updatedOptions = internalSelectedOptions.includes(option)
        ? internalSelectedOptions.filter(
            selectedOption => selectedOption !== option,
          )
        : [...(internalSelectedOptions || []), option];
    }

    setInternalSelectedOptions(updatedOptions);
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
              internalSelectedOptions &&
              internalSelectedOptions.includes('None of the Above') &&
              option !== 'None of the Above'
            }>
            <View
              style={{
                backgroundColor:
                  internalSelectedOptions &&
                  internalSelectedOptions.includes(option)
                    ? theme.backgroundColor.orangeCoral
                    : theme.backgroundColor.white,
                borderWidth: 2,
                borderColor:
                  internalSelectedOptions &&
                  internalSelectedOptions.includes(option)
                    ? theme.backgroundColor.orange
                    : theme.backgroundColor.borderGray,
                borderRadius: 5,
                padding: 10,
                margin: 10,
                alignItems: 'center',
                width: 60,
                opacity:
                  internalSelectedOptions &&
                  internalSelectedOptions.includes('None of the Above')
                    ? option === 'None of the Above'
                      ? 1
                      : 0.5
                    : 1,
              }}>
              <Text
                style={{
                  color:
                    internalSelectedOptions &&
                    internalSelectedOptions.includes(option)
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
