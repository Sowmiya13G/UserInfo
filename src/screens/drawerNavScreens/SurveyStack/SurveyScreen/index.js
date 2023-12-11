import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Background} from '../../../../components/Background/Background';
import MultiChoiceField from '../../../../components/MultiChoice';
import BooleanPicker from '../../../../components/BooleanPicker';
import RatingPicker from '../../../../components/RatingPicker/RatingPicker';
import dataJSON from '../../../../../data.json';
import {styles} from './styles';

import {
  setHealthConditionAction,
  setSinceHowLongAction,
  setMedicationDetailsAction,
  setMedicationStatusAction,
  setBloodSugarControlAction,
} from '../../../../redux/actions/medAction';
import theme from '../../../../constants/theme';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import strings from '../../../../constants/strings';

const SurveyScreen = ({navigation: {goBack}}) => {
  const healthCondition = useSelector(state => state.med.healthCondition);
  console.log('healthCondition', healthCondition);
  const sinceHowLong = useSelector(state => state.med.sinceHowLong);
  console.log('sinceHowLong', sinceHowLong);

  const medicationStatus = useSelector(state => state.med.medicationStatus);
  console.log('medicationStatus', medicationStatus);

  const medicationDetails = useSelector(state => state.med.medicationDetails);
  console.log('medicationDetails', medicationDetails);

  const bloodSugarControl = useSelector(state => state.med.bloodSugarControl);
  console.log('bloodSugarControl', bloodSugarControl);

  const options = dataJSON.questions[6].options;
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionPress = updatedOptions => {
    const isNoneSelected = updatedOptions.includes('None of the above');

    const updatedSelectedOptions = isNoneSelected ? [] : updatedOptions;

    setSelectedOptions(updatedSelectedOptions);

    dispatch(setHealthConditionAction(updatedSelectedOptions));
    dispatch(setSinceHowLongAction(''));
    dispatch(setMedicationStatusAction(updatedSelectedOptions.includes('yes')));
    dispatch(setBloodSugarControlAction(null));
  };

  const isHealthConditionSelected = selectedOptions.length > 0;
  console.log('isHealthConditionSelected', isHealthConditionSelected);
  const showMedicationDetails = medicationStatus === true;
  const handleSave = () => {};

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
        !selectedOptions.includes('None of the above') ? (
          <View style={styles.subContainer}>
            {selectedOptions.map((selectedType, index) => (
              <View key={index}>
                <Text style={styles.text}>{selectedType}</Text>

                <Text style={styles.text}>
                  {dataJSON.questions[7].question}
                </Text>
                <TextInput
                  value={sinceHowLong}
                  onChangeText={text => dispatch(setSinceHowLongAction(text))}
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
                      value={medicationDetails}
                      onChangeText={text =>
                        dispatch(setMedicationDetailsAction(text))
                      }
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
  const renderFooter = () => {
    return (
      <View style={styles.button}>
        <CustomButton logInButton label="Submit" handlePress={handleSave} />
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
