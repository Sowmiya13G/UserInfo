import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

//redux-Actions
import {
  setTextInputFrequencyAction,
  setSmokeOrTobaccoAction,
  setSelectTypeAction,
  setFrequencyAction,
} from '../../../../redux/actions/medAction';
import {useSelector, useDispatch} from 'react-redux';

//styles
import {styles} from './styles';

//constants
import strings from '../../../../constants/strings';
import theme from '../../../../constants/theme';

//components
import CustomButton from '../../../../components/CustomButton/CustomButton';
import {Background} from '../../../../components/Background/Background';
import BooleanPicker from '../../../../components/BooleanPicker';
import MultiChoiceField from '../../../../components/MultiChoice';
import DropdownPicker from '../../../../components/DropDownPicker';
//dataJson
import dataJSON from '../../../../../data.json';

const DetailsScreen = ({navigation: {goBack}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const dropDown = [...new Set(dataJSON.questions[5].options)];
  console.log('dropDown', dropDown);
  const [frequency, setFrequency] = useState('');
  const [frequencies, setFrequencies] = useState(
    Array(dropDown.length).fill(''),
  );

  const [textInputValues, setTextInputValues] = useState(
    Array(dropDown.length).fill(''),
  );

  const smokeOrTobacco = useSelector(state => state.med.smokeOrTobacco);
  console.log('smokeOrTobacco', smokeOrTobacco);

  const selectedTypes = useSelector(state => state.med.selectType);
  console.log('selectedTypes', selectedTypes);

  const selectedFrequency = useSelector(state => state.med.frequency);
  console.log('selectedFrequency', selectedFrequency);

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
        setFrequency([]);
      }
    }
  };
  const handleTextInputChange = (value, index) => {
    const updatedTextInputValues = [...textInputValues];
    updatedTextInputValues[index] = value;
    setTextInputValues(updatedTextInputValues);
    dispatch(setTextInputFrequencyAction(updatedTextInputValues));
  };
  const handleMultiChoicePress = selectedOptions => {
    dispatch(setSelectTypeAction(selectedOptions));
    dispatch(setFrequencyAction(null));
    setFrequency(Array(selectedOptions.length).fill(''));
  };

  const handleFrequencyChange = (value, index) => {
    const updatedFrequencies = [...frequencies];
    updatedFrequencies[index] = value;
    setFrequencies(updatedFrequencies);
    dispatch(setFrequencyAction(updatedFrequencies.filter(Boolean)));
  };

  const handleContinue = () => {
    navigation.navigate('SurveyScreen');
  };
  // useEffect(() => {
  //   // Load values from Redux state when the component mounts
  //   setTextInputValues(textInputValues =>
  //     textInputValues.map((value, index) =>
  //       selectedTypes[index] ? state.med.frequency[index] || '' : '',
  //     ),
  //   );
  // }, [selectedTypes]);
  const renderBody = () => {
    return (
      <ScrollView style={styles.scroll}>
        <Text style={styles.text}>{dataJSON.questions[2].question}</Text>
        <BooleanPicker
          onOptionPress={handleOptionPress}
          selectedType={smokeOrTobacco}
        />
        {smokeOrTobacco === true ? (
          <View style={styles.view}>
            <Text style={styles.text}>{dataJSON.questions[3].question}</Text>
            <MultiChoiceField
              options={options}
              onOptionPress={handleMultiChoicePress}
              selectedChoice={selectedTypes || []}
            />
            {selectedTypes && selectedTypes.length > 0 ? (
              <View>
                {selectedTypes.map((selectedType, index) => (
                  <View key={index}>
                    <Text style={styles.text}>
                      Enter the frequency of {selectedType}
                    </Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder={`Frequency of ${selectedType}`}
                        keyboardType="numeric"
                        value={frequencies[selectedType] || ''}
                        onChangeText={value =>
                          handleTextInputChange(value, index)
                        }
                        placeholderTextColor={theme.fontColors.borderGray}
                      />

                      <View style={styles.dropdownWrapper}>
                        <DropdownPicker
                          options={dropDown.map((option, dropIndex) => ({
                            label: option,
                            value: dropIndex.toString(),
                          }))}
                          selectedUnit={frequencies[index]}
                          setSelectedUnit={value =>
                            handleFrequencyChange(value, index)
                          }
                        />
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ) : null}
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
        <CustomButton logInButton label="Submit" handlePress={handleContinue} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <FlatList
        data={['DETAILS']}
        renderItem={renderBody}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderHeader()}
      />
      {renderFooter()}
    </SafeAreaView>
  );
};

export default DetailsScreen;
