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

// Packages
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

//redux-Actions
import {
  setTextInputFrequencyAction,
  setSmokeOrTobaccoAction,
  setSelectTypeAction,
  setFrequencyAction,
  setTextInputValueAction,
  setUserDataAction,
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
  // Variables
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const dropDown = [...new Set(dataJSON.questions[5].options)];
  const options = dataJSON.questions[3].options;

  // Use State
  const [frequency, setFrequency] = useState('');
  const [frequencies, setFrequencies] = useState(
    Array(dropDown.length).fill(''),
  );
  const [textInputValues, setTextInputValues] = useState(
    Array(dropDown.length).fill(''),
  );

  // Use Selectors
  const smokeOrTobacco = useSelector(state => state.med.smokeOrTobacco);
  const selectedTypes = useSelector(state => state.med.selectType);
  const selectedFrequency = useSelector(state => state.med.frequency);
  // const userDatavalue = useSelector(state => state.med.userData);

  // Functions
  const handleOptionPress = option => {
    const value = dispatch(setSmokeOrTobaccoAction(option));

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
    console.log('VALUE', value);
    const updatedTextInputValues = [...textInputValues];

    updatedTextInputValues[index] = value;
    setTextInputValues(updatedTextInputValues);
    dispatch(setTextInputValueAction(updatedTextInputValues));
  };
  console.log('textInputValues', textInputValues);
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

    // dispatch(setUserDataAction(userData));
    // dispatch(setUserDataAction(userDatavalue));
  };

  // useEffect(() => {
  //   // Update local state if necessary
  //   setUserData(userDatavalue);
  // }, [userData]);

  // Render UI .........................

  // render body
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
                      {console.log('aklsfhuiagsdf', frequencies)}
                      <TextInput
                        style={styles.input}
                        placeholder={`Frequency of ${selectedType}`}
                        keyboardType="numeric"
                        value={textInputValues}
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

  // Render header
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

  // Render footer
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

// const handleTextInputChange = (value, index) => {
//   const updatedUserData = {...userData};
//   updatedUserData.details.selectedTypes[index].textInputValue = value;

//   dispatch(setUserDataAction(updatedUserData));
// };

// const handleMultiChoicePress = selectedOptions => {
//   dispatch(setSelectTypeAction(selectedOptions));
//   dispatch(setFrequencyAction(null));
// };

// const handleFrequencyChange = (value, index) => {
//   const updatedUserData = {...userData};
//   updatedUserData.details.selectedTypes[index].selectedFrequency = value;

//   dispatch(setUserDataAction(updatedUserData));
// };

// const [userData, setUserData] = useState({
//   details: {
//     smokeOrTobacco: '',
//     selectedTypes: [
//       {
//         textInputValue: '',
//         selectedFrequency: '',
//       },
//     ],
//   },
// });

// const dropDown = [...new Set(dataJSON.questions[5].options)];

// const smokeOrTobacco = useSelector(state => state.med.smokeOrTobacco);
// const selectedTypes = useSelector(state => state.med.selectType);

// const handleOptionPress = option => {
//   const value = dispatch(setSmokeOrTobaccoAction(option));

//   if (value.payload) {
//     if (option === true) {
//       dispatch(setSelectTypeAction([]));
//     } else {
//       dispatch(setSelectTypeAction(null));
//     }
//   }
// };

// const handleTextInputChange = (value, index) => {
//   const updatedUserData = {...userData};
//   updatedUserData.details.selectedTypes[index].textInputValue = value;
//   setUserData(updatedUserData);
// };

// const handleFrequencyChange = (value, index) => {
//   const updatedUserData = {...userData};
//   updatedUserData.details.selectedTypes[index].selectedFrequency = value;
//   setUserData(updatedUserData);
// };

// const handleContinue = () => {
//   // Access user data from the state
//   console.log(userData);
//   navigation.navigate('SurveyScreen');
// };

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   SafeAreaView,
//   FlatList,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// // Redux actions and selectors
// import {
//   setTextInputFrequencyAction,
//   setSmokeOrTobaccoAction,
//   setSelectTypeAction,
//   setFrequencyAction,
//   setTextInputValueAction,
// } from '../../../../redux/actions/medAction';
// import {useSelector, useDispatch} from 'react-redux';

// // Styles and constants
// import {styles} from './styles';
// import strings from '../../../../constants/strings';
// import theme from '../../../../constants/theme';

// // Components
// import CustomButton from '../../../../components/CustomButton/CustomButton';
// import {Background} from '../../../../components/Background/Background';
// import BooleanPicker from '../../../../components/BooleanPicker';
// import MultiChoiceField from '../../../../components/MultiChoice';
// import DropdownPicker from '../../../../components/DropDownPicker';

// // Data JSON
// import dataJSON from '../../../../../data.json';

// const DetailsScreen = ({navigation: {goBack}}) => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();

//   const [userData, setUserData] = useState({
//     details: {
//       smokeOrTobacco: '',
//       selectedTypes: [
//         {
//           textInputValue: '',
//           selectedFrequency: '',
//         },
//       ],
//     },
//   });

//   const dropDown = [...new Set(dataJSON.questions[5].options)];

//   const smokeOrTobacco = useSelector(state => state.med.smokeOrTobacco);
//   const selectedTypes = useSelector(state => state.med.selectType);

//   const handleOptionPress = option => {
//     const value = dispatch(setSmokeOrTobaccoAction(option));

//     if (value.payload) {
//       if (option === true) {
//         dispatch(setSelectTypeAction([]));
//       } else {
//         dispatch(setSelectTypeAction(null));
//       }
//     }
//   };

//   const handleTextInputChange = (value, index) => {
//     const updatedUserData = {...userData};
//     updatedUserData.details.selectedTypes =
//       updatedUserData.details.selectedTypes || [];

//     if (!updatedUserData.details.selectedTypes[index]) {
//       updatedUserData.details.selectedTypes[index] = {};
//     }

//     updatedUserData.details.selectedTypes[index].textInputValue = value;
//     setUserData(updatedUserData);
//   };

//   const handleFrequencyChange = (value, index) => {
//     const updatedUserData = {...userData};
//     updatedUserData.details.selectedTypes =
//       updatedUserData.details.selectedTypes || [];

//     if (!updatedUserData.details.selectedTypes[index]) {
//       updatedUserData.details.selectedTypes[index] = {};
//     }

//     updatedUserData.details.selectedTypes[index].selectedFrequency = value;
//     setUserData(updatedUserData);
//   };

//   const handleContinue = () => {
//     console.log(userData);
//     navigation.navigate('SurveyScreen');
//   };

//   const renderBody = () => {
//     return (
//       <ScrollView style={styles.scroll}>
//         <Text style={styles.text}>{dataJSON.questions[2].question}</Text>
//         <BooleanPicker
//           onOptionPress={handleOptionPress}
//           selectedType={smokeOrTobacco}
//         />
//         {smokeOrTobacco === true && (
//           <View style={styles.view}>
//             <Text style={styles.text}>{dataJSON.questions[3].question}</Text>
//             <MultiChoiceField
//               options={dataJSON.questions[3].options}
//               onOptionPress={selectedOptions =>
//                 dispatch(setSelectTypeAction(selectedOptions))
//               }
//               selectedChoice={selectedTypes || []}
//             />
//             {selectedTypes &&
//               selectedTypes.length > 0 &&
//               selectedTypes.map((selectedType, index) => (
//                 <View key={index}>
//                   <Text style={styles.text}>
//                     Enter the frequency of {selectedType}
//                   </Text>
//                   <View style={styles.inputContainer}>
//                     <TextInput
//                       style={styles.input}
//                       placeholder={`Frequency of ${selectedType}`}
//                       keyboardType="numeric"
//                       value={
//                         userData.details.selectedTypes[index]?.textInputValue
//                       }
//                       onChangeText={value =>
//                         handleTextInputChange(value, index)
//                       }
//                       placeholderTextColor={theme.fontColors.borderGray}
//                     />
//                     <View style={styles.dropdownWrapper}>
//                       <DropdownPicker
//                         options={dropDown.map((option, dropIndex) => ({
//                           label: option,
//                           value: dropIndex.toString(),
//                         }))}
//                         selectedUnit={
//                           userData.details.selectedTypes[index]
//                             ?.selectedFrequency
//                         }
//                         setSelectedUnit={value =>
//                           handleFrequencyChange(value, index)
//                         }
//                       />
//                     </View>
//                   </View>
//                 </View>
//               ))}
//           </View>
//         )}
//       </ScrollView>
//     );
//   };

//   const renderHeader = () => {
//     return (
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => goBack()} style={styles.icon}>
//           <Icon name="angle-left" size={30} color={theme.fontColors.black} />
//         </TouchableOpacity>
//         <Text style={styles.title}>{strings.medicalHistory}</Text>
//       </View>
//     );
//   };

//   const renderFooter = () => {
//     return (
//       <View style={styles.button}>
//         <CustomButton
//           logInButton
//           label={strings.continue}
//           handlePress={handleContinue}
//         />
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Background />
//       <FlatList
//         data={['DETAILS']}
//         renderItem={renderBody}
//         keyExtractor={(item, index) => index.toString()}
//         ListHeaderComponent={renderHeader()}
//       />
//       {renderFooter()}
//     </SafeAreaView>
//   );
// };

// export default DetailsScreen;
