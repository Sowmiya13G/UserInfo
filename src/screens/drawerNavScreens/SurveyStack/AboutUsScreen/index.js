import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

// Packages
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

//redux-Actions
import {
  setMultiChoiceOptionsAction,
  setSelectedUnitAction,
  setTextInputValueAction,
} from '../../../../redux/actions/medAction';

//styles
import {styles} from './styles';
import {widthPercentageToDP} from 'react-native-responsive-screen';

//constants
import theme from '../../../../constants/theme';
import strings from '../../../../constants/strings';

//components
import {Background} from '../../../../components/Background/Background';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import DropdownPicker from '../../../../components/DropDownPicker';
import MultiChoiceField from '../../../../components/MultiChoice';

//dataJson
import dataJSON from '../../../../../data.json';

const AboutUsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  //useState
  const [inputFocused, setInputFocused] = useState(false);
  const [userData, setUserData] = useState({
    details: {
      selectedUnit: '',
      textInputValue: '',
      multiChoiceOptions: [],
    },
  });

  //Selectors
  const selectedUnit = useSelector(state => state.med.selectedUnit);
  console.log('selectedUnit', selectedUnit);
  const multiChoiceOptions = useSelector(state => state.med.multiChoiceOptions);
  const heightValue = useSelector(state => state.med.textInputValue);

  const options = dataJSON.questions[1].options;
  const dropDown = dataJSON.questions[0].options;
  console.log('dropDown:', dropDown);
  const [unit, setUnit] = useState(Array(dropDown.length).fill(''));

  // handle Fucntions:
  const handleTextInputChange = value => {
    setUserData(prevData => ({...prevData, textInputValue: value}));
    dispatch(setTextInputValueAction(value));
  };

  const handleSelectedUnitChange = value => {
    console.log('value', value);
    // const updatedUnit = [...value];
    setUnit(value);
    dispatch(setSelectedUnitAction(value));
  };
  // setUserData(prevData => ({...prevData, selectedUnit: unit}));
  // console.log('After dispatch - selectedUnit:', unit);
  // dispatch(setSelectedUnitAction(unit));

  const handleMultiChoiceChange = selectedOptions => {
    const noneOfTheAbove = ['None of the above'];
    const isNoneSelected = selectedOptions.includes('None of the above');
    const updatedOptions = selectedOptions.filter(
      option => option !== 'None of the above',
    );
    const firstOption = selectedOptions[0];
    const lastOption = selectedOptions.length - 1;
    const operation =
      lastOption == 'None of the above' || firstOption == 'None of the above';

    console.log(isNoneSelected, selectedOptions);
    const updatedSelectedOptions = isNoneSelected
      ? selectedOptions.length == 1
        ? noneOfTheAbove
        : operation
        ? updatedOptions
        : noneOfTheAbove
      : selectedOptions;
    setUserData(prevData => ({
      ...prevData,
      multiChoiceOptions: updatedSelectedOptions,
    }));
    dispatch(setMultiChoiceOptionsAction(updatedSelectedOptions));
  };
  const handleContinue = () => {
    navigation.navigate('DetailsScreen');
  };

  //useEffect
  useEffect(() => {
    console.log('Updated selectedUnit:', selectedUnit);
  }, [selectedUnit]);

  // Render UI .........................

  // Render Body
  renderBody = () => {
    return (
      <View style={styles.scroll}>
        <Text style={styles.text}>
          {dataJSON.questions[0].question} (in{' '}
          {selectedUnit == 0 ? 'cm' : 'inch'})
        </Text>
        <View style={styles.view}>
          <View style={styles.dropdownWrapper}>
            <DropdownPicker
              options={dropDown.map((option, index) => ({
                label: option,
                value: index.toString(),
              }))}
              // options={dropDown.map(a => String(a))}

              selectedUnit={selectedUnit}
              setSelectedUnit={value => handleSelectedUnitChange(value)}
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
            value={userData.details.textInputValue}
            onChangeText={handleTextInputChange}
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
            selectedChoice={multiChoiceOptions || []}
          />
        </View>
      </View>
    );
  };

  // Render Header
  renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()} style={styles.icon}>
          <Icon name="angle-left" size={30} color={theme.fontColors.black} />
        </TouchableOpacity>
        <Text style={styles.title}>{strings.medicalHistory}</Text>
      </View>
    );
  };

  // Render Footer
  const renderFooter = () => {
    return (
      <View style={styles.button}>
        <CustomButton
          logInButton
          label={strings.continue}
          handlePress={handleContinue}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <FlatList
        data={['ABOUT']}
        renderItem={renderBody}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderHeader()}
      />
      {renderFooter()}
    </SafeAreaView>
  );
};

export default AboutUsScreen;

// console.log('selectedUnit....', selectedUnit);
// console.log('multiChoiceOptions', multiChoiceOptions);
// console.log('heightValue', heightValue);
// console.log('options', options);
// console.log('dropDown', dropDown);
// console.log('inNoSelected:', isNoneSelected);
// console.log('selectedOptions', selectedOptions);

// const handleMultiChoiceChange = selectedOptions => {
//   const isNoneSelected = selectedOptions.includes('None of the above');
//   const selected = selectedOptions.includes(
//     'Dust',
//     'Coal',
//     'Asbestos',
//     'Fibres',
//     'Smoke',
//     'Others',
//   );
//   console.log('selected', selected);
//   let updatedSelectedOptions;
//   if (selected) {
//     updatedSelectedOptions = selectedOptions.filter(
//       option => option !== 'None of the above',
//     );
//   } else if (isNoneSelected) {
//     updatedSelectedOptions = ['None of the above'];
//   } else {
// updatedSelectedOptions = selectedOptions.filter(
//   option => option !== 'None of the above',
// );
//   }

//   dispatch(setMultiChoiceOptionsAction(updatedSelectedOptions));
// };

// const handleMultiChoiceChange = selectedOptions => {
//   const isNoneSelected = selectedOptions.includes('None of the above');
//   const updatedOptions = selectedOptions.filter(
//     option => option !== 'None of the above',
//   );
//   const updatedSelectedOptions = isNoneSelected
//     ? ['None of the above']
//     : selectedOptions;

//   dispatch(setMultiChoiceOptionsAction(updatedSelectedOptions));
// };

// const handleMultiChoiceChange = selectedOptions => {
//   const isNoneSelected = selectedOptions.includes('None of the above');
//   const updatedOptions = selectedOptions.filter(
//     option => option !== 'None of the above',
//   );
//   const updatedSelectedOptions = isNoneSelected
//     ? ['None of the above']
//     : selectedOptions;

//   dispatch(setMultiChoiceOptionsAction(updatedSelectedOptions));
// };

///...........
// const handleTextInputChange = value => {
//   setTextInputValue(value);
//   dispatch(setTextInputValueAction(value));
// };
// const handleSelectedUnitChange = unit => {
//   if (unit) {
//     dispatch(setSelectedUnitAction(unit));
//   }
//   console.log('After dispatch - selectedUnit:', selectedUnit);
// };
