// import React from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   FlatList,
//   TouchableOpacity,
// } from 'react-native';
// import {Background} from '../../../../components/Background/Background';
// import {styles} from './styles';
// import CustomButton from '../../../../components/CustomButton/CustomButton';
// import {useSelector} from 'react-redux';

// import strings from '../../../../constants/strings';

// const PreviewScreen = ({navigation: {goBack}}) => {
//   const selectMedicalSurveyData = state => state.med;
//   const medicalSurveyData = useSelector(selectMedicalSurveyData);

//   const handlePreview = () => {
//     console.log('Med data:', medicalSurveyData);
//   };

//   const renderHeader = () => {
//     return (
//       <View style={styles.header}>
//         <Text style={styles.title}>{strings.medicalHistoryPreview}</Text>
//       </View>
//     );
//   };

//   const renderBody = () => {
//     return (
//       <View>
//         <TouchableOpacity onPress={handlePreview}>
//           <Text style={styles.text}>{strings.preview}</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   const renderFooter = () => {
//     return (
//       <View style={styles.button}>
//         <CustomButton logInButton label={strings.goBack} handlePress={goBack} />
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Background />
//       <FlatList
//         data={['SURVEY']}
//         renderItem={renderBody}
//         keyExtractor={(item, index) => index.toString()}
//         ListHeaderComponent={renderHeader()}
//       />
//       {renderFooter()}
//     </SafeAreaView>
//   );
// };

// export default PreviewScreen;
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Background} from '../../../../components/Background/Background';
import {styles} from './styles';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import {useSelector} from 'react-redux';
import strings from '../../../../constants/strings';
import dataJSON from '../../../../../data.json';

const PreviewScreen = ({navigation: {goBack}}) => {
  const medicalSurveyData = useSelector(state => state.med);
  console.log('medicalSurveyData', medicalSurveyData);

  const getQuestionAndAnswerPairs = () => {
    const pairs = [];

    dataJSON.questions.forEach(question => {
      const {id, question: questionText} = question;
      const userAnswer = medicalSurveyData[id];
      console.log(userAnswer);

      if (userAnswer !== undefined && userAnswer !== null) {
        pairs.push({
          id,
          question: questionText,
          answer: Array.isArray(userAnswer)
            ? userAnswer.join(', ')
            : userAnswer,
        });
      } else {
        console.warn(`No answer found for question with ID ${id}`);
      }
    });

    return pairs;
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{strings.medicalHistoryPreview}</Text>
      </View>
    );
  };

  const renderBody = () => {
    const questionAnswerPairs = getQuestionAndAnswerPairs();

    return (
      <View>
        {questionAnswerPairs.map(pair => (
          <View key={pair.id}>
            <Text style={styles.text}>{pair.question}</Text>
            <Text style={styles.text}>{pair.answer}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.button}>
        <CustomButton logInButton label={strings.goBack} handlePress={goBack} />
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

export default PreviewScreen;

{
  /* {medicalSurveyData ? (
          <View style={styles.previewContainer}>
            <Text style={styles.previewText}>
              Height: {medicalSurveyData.selectedUnit}{' '}
              {medicalSurveyData.textInputValue}
            </Text>
            <Text style={styles.previewText}>
              Work Exposure: {medicalSurveyData.multiChoiceOptions.join(', ')}
            </Text>
          </View>
        ) : null} */
}
