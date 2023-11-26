import React, {useEffect, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import dataJSON from '../../../../data.json';
import {styles} from './styles';
import {Background} from '../../../components/Background/Background';
import BooleanPicker from '../../../components/BooleanPicker';
import MultiChoiceField from '../../../components/MultiChoice';
import DropdownPicker from '../../../components/DropDownPicker';
import {
  setSmokeOrTobaccoAction,
  setSelectTypeAction,
  setFrequencyAction,
} from '../../../redux/actions/medAction';

const DetailsScreen = () => {
  const dispatch = useDispatch();
  const smokeOrTobacco = useSelector(state => state.user.smokeOrTobacco);
  console.log('smokeOrTobacco', smokeOrTobacco);

  const selectedTypes = useSelector(state => state.user.selectType);
  console.log('selectedTypes', selectedTypes);

  const options = dataJSON.questions[3].options;
  console.log('options', options);

  const dropDown = dataJSON.questions[5].options;
  console.log('dropDown', dropDown);
  const [frequency, setFrequency] = useState('');
  const handleOptionPress = option => {
    const value = dispatch(setSmokeOrTobaccoAction(option));
    console.log('value', value);

    if (value.payload) {
      if (option === true) {
        dispatch(setSelectTypeAction(null));
        dispatch(setFrequencyAction(null));
      } else {
        dispatch(setSelectTypeAction([]));
        dispatch(setFrequencyAction(null));
      }
    }
  };

  const handleMultiChoicePress = selectedOptions => {
    dispatch(setSelectTypeAction(selectedOptions));
    setFrequency('');
    dispatch(setFrequencyAction(null));
  };

  const handleFrequencyChange = value => {
    setFrequency(value);
    dispatch(setFrequencyAction(value));
  };

  useEffect(() => {
    console.log('Initial smokeOrTobacco:', smokeOrTobacco);
  }, [smokeOrTobacco]);

  return (
    <View style={styles.container}>
      <Background />
      <Text style={styles.text}>{dataJSON.questions[2].question}</Text>
      <BooleanPicker onOptionPress={handleOptionPress} />
      {smokeOrTobacco === true ? (
        <View style={styles.view}>
          <Text style={styles.text}>{dataJSON.questions[3].question}</Text>
          <MultiChoiceField
            options={options}
            onOptionPress={selectedOptions =>
              dispatch(setSelectTypeAction(selectedOptions))
            }
          />
          {selectedTypes && selectedTypes.length > 0 ? (
            <View>
              <Text style={styles.text}>
                Enter the frequency of the selected choice
              </Text>
              <TextInput
                style={styles.input}
                value={frequency}
                onChangeText={handleFrequencyChange}
                placeholder="Frequency"
                keyboardType="numeric"
              />
              <DropdownPicker
                options={dropDown}
                onOptionPress={handleMultiChoicePress}
              />
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default DetailsScreen;
