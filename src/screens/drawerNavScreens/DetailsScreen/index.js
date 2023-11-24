import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import dataJSON from '../../../../data.json';
import {styles} from './styles';
import {Background} from '../../../components/Background/Background';
import BooleanPicker from '../../../components/BooleanPicker';
import MultiChoiceField from '../../../components/MultiChoice';
import {
  setSmokeOrTobaccoAction,
  setSelectTypeAction,
  setFrequencyAction,
} from '../../../redux/actions/medAction';

const DetailsScreen = () => {
  const dispatch = useDispatch();
  const smokeOrTobacco = useSelector(state => state.user.smokeOrTobacco);
  console.log('smokeOrTobacco', smokeOrTobacco);
  const options = dataJSON.questions[3].options;
  console.log('options', options);

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
        </View>
      ) : null}
    </View>
  );
};

export default DetailsScreen;
