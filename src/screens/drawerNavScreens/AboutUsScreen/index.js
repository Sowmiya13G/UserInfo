import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, TextInput, Text} from 'react-native';
import {Background} from '../../../components/Background/Background';
import {styles} from './styles';
import theme from '../../../constants/theme';
import MultiChoiceField from '../../../components/MultiChoice';
import dataJSON from '../../../../data.json';
import {
  setMultiChoiceOptionsAction,
  setSelectedUnitAction,
} from '../../../redux/actions/medAction';
import DropdownPicker from '../../../components/DropDownPicker';
import CustomButton from '../../../components/CustomButton/CustomButton';
const AboutUsScreen = () => {
  const [inputFocused, setInputFocused] = useState(false);
  const selectedUnit = useSelector(state => state.user.selectedUnit);
  console.log('selectedUnit', selectedUnit);
  const multiChoiceOptions = useSelector(
    state => state.user.multiChoiceOptions,
  );

  console.log('options', JSON.stringify(multiChoiceOptions));
  const dispatch = useDispatch();

  const options = dataJSON.questions[1].options;

  const handleSelectedUnitChange = unit => {
    const unitResult = dispatch(setSelectedUnitAction(unit));
    console.log('unit', unitResult);
  };

  const handleMultiChoiceChange = options => {
    const choiceResult = dispatch(setMultiChoiceOptionsAction(options));
    console.log('choiceResult', choiceResult);
  };

  return (
    <View style={styles.container}>
      <Background />
      <Text style={styles.text}>
        {dataJSON.questions[0].question}(in
        {selectedUnit ? selectedUnit.value : ''}
        {selectedUnit.value})
      </Text>
      <View style={styles.view}>
        <View style={styles.dropdownWrapper}>
          <DropdownPicker
            selectedUnit={selectedUnit}
            setSelectedUnit={handleSelectedUnitChange}
          />
        </View>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: inputFocused
                ? theme.backgroundColor.orange
                : theme.backgroundColor.black,
              color: theme.fontColors.secondaryBlack,
            },
          ]}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          value={selectedUnit ? selectedUnit.value : ''}
          keyboardType="numeric"
        />
      </View>
      <Text style={styles.text}>{dataJSON.questions[1].question}</Text>
      <View
        style={{width: theme.screenWidth, height: 200, marginBottom: '10%'}}>
        <MultiChoiceField
          options={options}
          onOptionPress={handleMultiChoiceChange}
        />
      </View>
    </View>
  );
};

export default AboutUsScreen;
