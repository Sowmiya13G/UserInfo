import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import dataJSON from '../../../../../data.json';
import {styles} from './styles';
import {Background} from '../../../../components/Background/Background';
import BooleanPicker from '../../../../components/BooleanPicker';
import MultiChoiceField from '../../../../components/MultiChoice';
import DropdownPicker from '../../../../components/DropDownPicker';
import {
  setSmokeOrTobaccoAction,
  setSelectTypeAction,
  setFrequencyAction,
} from '../../../../redux/actions/medAction';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import theme from '../../../../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import strings from '../../../../constants/strings';
const DetailsScreen = ({navigation: {goBack}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [frequency, setFrequency] = useState('');
  const smokeOrTobacco = useSelector(state => state.user.smokeOrTobacco);
  console.log('smokeOrTobacco', smokeOrTobacco);

  const selectedTypes = useSelector(state => state.user.selectType);
  console.log('selectedTypes', selectedTypes);

  const selectedFrequency = useSelector(state => state.user.frequency);
  console.log('selectedFrequency', selectedFrequency);

  const options = dataJSON.questions[3].options;
  console.log('options', options);

  const dropDown = [...new Set(dataJSON.questions[5].options)];
  console.log('dropDown', dropDown);

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

  const handleMultiChoicePress = selectedOptions => {
    dispatch(setSelectTypeAction(selectedOptions));
    dispatch(setFrequencyAction(null));
    setFrequency(Array(selectedOptions.length).fill(''));
  };

  const handleFrequencyChange = (value, index) => {
    const updatedFrequencies = [...frequency];
    updatedFrequencies[index] = value;
    setFrequency(updatedFrequencies);
    dispatch(setFrequencyAction(updatedFrequencies.filter(Boolean)));
  };
  const handleContinue = () => {
    navigation.navigate('SurveyScreen');
  };
  const renderBody = () => {
    return (
      <View style={styles.scroll}>
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
                    <TextInput
                      style={styles.input}
                      value={frequency[index] || ''}
                      placeholder={`Frequency of ${selectedType}`}
                      keyboardType="numeric"
                      onChangeText={text => handleFrequencyChange(text, index)}
                      placeholderTextColor={theme.fontColors.borderGray}
                    />

                    <View style={styles.dropdownWrapper}>
                      <DropdownPicker
                        options={dropDown.map((option, index) => ({
                          label: option,
                          value: index.toString(),
                        }))}
                        selectedUnit={selectedFrequency}
                        setSelectedUnit={value =>
                          dispatch(setFrequencyAction(value))
                        }
                      />
                    </View>
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        ) : null}
      </View>
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
