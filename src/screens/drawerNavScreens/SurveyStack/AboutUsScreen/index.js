import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, TextInput, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Background} from '../../../../components/Background/Background';
import {styles} from './styles';
import theme from '../../../../constants/theme';
import MultiChoiceField from '../../../../components/MultiChoice';
import dataJSON from '../../../../../data.json';
import {
  setMultiChoiceOptionsAction,
  setSelectedUnitAction,
} from '../../../../redux/actions/medAction';
import DropdownPicker from '../../../../components/DropDownPicker';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import CustomButton from '../../../../components/CustomButton/CustomButton';
const AboutUsScreen = () => {
  const [inputFocused, setInputFocused] = useState(false);
  const selectedUnit = useSelector(state => state.user.selectedUnit);
  console.log('selectedUnit....', selectedUnit);
  const multiChoiceOptions = useSelector(
    state => state.user.multiChoiceOptions,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const options = dataJSON.questions[1].options;
  const dropDown = dataJSON.questions[0].options;
  const handleSelectedUnitChange = unit => {
    if (unit) {
      dispatch(setSelectedUnitAction(unit));
    }
    console.log('After dispatch - selectedUnit:', selectedUnit);
  };

  const handleMultiChoiceChange = selectedOptions => {
    const isNoneSelected = selectedOptions.includes('None of the above');

    const updatedSelectedOptions = isNoneSelected
      ? ['None of the above']
      : selectedOptions;

    dispatch(setMultiChoiceOptionsAction(updatedSelectedOptions));
  };
  // const handleMultiChoiceChange = selectedOptions => {
  //   const isNoneSelected = selectedOptions.includes('None of the above');

  //   let updatedSelectedOptions;

  //   if (isNoneSelected) {
  //     updatedSelectedOptions = ['None of the above'];
  //   } else {
  //     updatedSelectedOptions = selectedOptions.filter(
  //       option => option !== 'None of the above',
  //     );
  //   }

  //   dispatch(setMultiChoiceOptionsAction(updatedSelectedOptions));
  // };

  const handleContinue = () => {
    navigation.navigate('DetailsScreen');
  };

  useEffect(() => {
    console.log('Updated selectedUnit:', selectedUnit);
  }, [selectedUnit]);
  return (
    <View style={styles.container}>
      <Background />
      <Text style={styles.text}>
        {dataJSON.questions[0].question} (in {selectedUnit})
      </Text>
      <View style={styles.view}>
        <View style={styles.dropdownWrapper}>
          <DropdownPicker
            options={dropDown.map((option, index) => ({
              label: option,
              value: index.toString(),
            }))}
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
          keyboardType="numeric"
        />
      </View>
      <Text style={styles.text}>{dataJSON.questions[1].question}</Text>
      <View
        style={{
          width: widthPercentageToDP('99%'),
          height: 200,
          marginBottom: '10%',
        }}>
        <MultiChoiceField
          options={options}
          onOptionPress={handleMultiChoiceChange}
          selectedChoice={multiChoiceOptions}
        />
      </View>
      <CustomButton logInButton label="Continue" handlePress={handleContinue} />
    </View>
  );
};

export default AboutUsScreen;
