import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

// packages
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

//redux-Actions
import {useSelector, useDispatch} from 'react-redux';
import {
  setHealthConditionAction,
  setSinceHowLongAction,
  setMedicationDetailsAction,
  setMedicationStatusAction,
  setBloodSugarControlAction,
} from '../../../../redux/actions/medAction';

//styles
import {styles} from './styles';

//constants
import theme from '../../../../constants/theme';
import strings from '../../../../constants/strings';

//components
import {Background} from '../../../../components/Background/Background';
import MultiChoiceField from '../../../../components/MultiChoice';
import BooleanPicker from '../../../../components/BooleanPicker';
import RatingPicker from '../../../../components/RatingPicker/RatingPicker';
import CustomButton from '../../../../components/CustomButton/CustomButton';

//dataJson
import dataJSON from '../../../../../data.json';

const SurveyScreen = ({navigation: {goBack}}) => {
  // Variables
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const options = dataJSON.questions[6].options;
  const isHealthConditionSelected = healthCondition.length > 0;
  const showMedicationDetails = medicationStatus === true;

  // Use State
  const [sinceHowLongValues, setSinceHowLongValues] = useState(
    Array(healthCondition.length).fill(''),
  );
  const [medicationDetailsValue, setmedicationDetailsValue] =
    useState(medicationDetails);
  console.log(medicationDetailsValue);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [detailsState, setDetailsState] = useState([]);

  // Use Selectors
  const bloodSugarControl = useSelector(state => state.med.bloodSugarControl);
  const healthCondition = useSelector(state => state.med.healthCondition);
  const sinceHowLong = useSelector(state => state.med.sinceHowLong);
  const medicationDetails = useSelector(state => state.med.medicationDetails);
  console.log('medicationDetails', medicationDetails);
  const medicationStatus = useSelector(state => state.med.medicationStatus);

  // Functions

  const handleOptionPress = selectedOptions => {
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

    setSelectedOptions(updatedSelectedOptions);

    dispatch(setHealthConditionAction(updatedSelectedOptions));
    dispatch(setSinceHowLongAction(''));
    dispatch(setMedicationStatusAction(updatedSelectedOptions.includes('yes')));
    dispatch(setBloodSugarControlAction(null));
  };

  const handleSave = () => {
    navigation.navigate('PreviewScreen');
  };
  const handleSinceHowLongChange = (text, index) => {
    const updatedSinceHowLongValues = [...sinceHowLongValues];
    updatedSinceHowLongValues[index] = text;
    setSinceHowLongValues(updatedSinceHowLongValues);
  };

  const handleDetails = (text, index) => {
    setDetailsState(prev => {
      const updatedDetails = [...prev];
      updatedDetails[index] = text;
      return updatedDetails;
    });
  };
  console.log('detailsState', detailsState);

  // Use Effect
  useEffect(() => {
    dispatch(setMedicationDetailsAction(detailsState));
  }, [detailsState]);

  // Render UI .........................

  // Render Body
  const renderBody = () => {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.view}>
          <Text style={styles.text}>{dataJSON.questions[6].question}</Text>
          <MultiChoiceField
            options={options}
            onOptionPress={handleOptionPress}
            selectedChoice={healthCondition || []}
          />
        </View>
        {isHealthConditionSelected &&
        !healthCondition.includes('None of the above') ? (
          <View style={styles.subContainer}>
            {healthCondition.map((selectedType, index) => (
              <View key={index}>
                <Text style={styles.text}>{selectedType}</Text>

                <Text style={styles.text}>
                  {dataJSON.questions[7].question}
                </Text>
                <TextInput
                  value={sinceHowLongValues[index]}
                  // onChangeText={text => dispatch(setSinceHowLongAction(text))}
                  onChangeText={text => handleSinceHowLongChange(text, index)}
                  style={styles.input}
                  placeholder="Enter the duration in year/months"
                  placeholderTextColor={theme.fontColors.gray}
                  keyboardType="numeric"
                />

                <Text style={styles.text}>
                  {dataJSON.questions[8].question}
                </Text>
                <BooleanPicker
                  onOptionPress={value =>
                    dispatch(setMedicationStatusAction(value))
                  }
                  selectedType={medicationStatus}
                />

                {showMedicationDetails ? (
                  <>
                    <Text style={styles.text}>
                      {dataJSON.questions[9].question}
                    </Text>
                    <TextInput
                      // value={medicationValue}
                      value={medicationDetails[index]}
                      onChangeText={text => handleDetails(text, index)}
                      style={styles.input}
                      placeholder="Enter here"
                      placeholderTextColor={theme.fontColors.gray}
                    />
                  </>
                ) : null}

                <Text style={styles.text}>
                  {dataJSON.questions[10].question}
                </Text>
                <RatingPicker
                  onOptionPress={option =>
                    dispatch(setBloodSugarControlAction(option))
                  }
                />
              </View>
            ))}
          </View>
        ) : null}
      </ScrollView>
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
          handlePress={handleSave}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <FlatList
        data={['SURVEY']}
        renderItem={renderBody}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderHeader()}
      />
      {renderFooter()}
    </SafeAreaView>
  );
};

export default SurveyScreen;

// const [userData, setUserData] = useState({
//   details: {
//     healthCondition: [
//       {
//         sinceHowLong: '',
//         medicationStatus: {
//           medicationDetails: '',
//         },
//         bloodSugarControl: '',
//       },
//     ],
//   },
// });

// const handleOptionPress = updatedOptions => {
//   setSelectedOptions(updatedOptions);

//   dispatch(setHealthConditionAction(updatedOptions));
//   dispatch(setSinceHowLongAction(''));
//   dispatch(setMedicationStatusAction(updatedOptions.includes('yes')));
//   dispatch(setBloodSugarControlAction(null));
// };

//good
// const handleOptionPress = updatedOptions => {
//   const isNoneSelected = updatedOptions.includes('None of the above');

//   const finalOptions = isNoneSelected
//     ? ['None of the above']
//     : updatedOptions;

//   setSelectedOptions(finalOptions);

//   dispatch(setHealthConditionAction(finalOptions));

//   if (isNoneSelected) {
//     // dispatch(setSinceHowLongAction(''));
//     // dispatch(setMedicationStatusAction(false));
//     // dispatch(setBloodSugarControlAction(null));
//   } else {
//     dispatch(setSinceHowLongAction(''));
//     dispatch(setMedicationStatusAction(finalOptions.includes('yes')));
//     dispatch(setBloodSugarControlAction(null));
//   }
// };
