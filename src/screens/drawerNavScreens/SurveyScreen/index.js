import React, {useState, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Background} from '../../../components/Background/Background';
import MultiChoiceField from '../../../components/MultiChoice';
import BooleanPicker from '../../../components/BooleanPicker';
import dataJSON from '../../../../data.json';
import {styles} from './styles';
import {
  setHealthConditionAction,
  setSinceHowLongAction,
  setMedicationDetailsAction,
  setMedicationStatusAction,
  setBloodSugarControlAction,
} from '../../../redux/actions/medAction';

const SurveyScreen = () => {
  const healthCondition = useSelector(state => state.healthCondition);
  const sinceHowLong = useSelector(state => state.sinceHowLong);
  const medicationStatus = useSelector(state => state.medicationStatus);
  const medicationDetails = useSelector(state => state.medicationDetails);
  const bloodSugarControl = useSelector(state => state.bloodSugarControl);

  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions(dataJSON.questions);
  }, []);
  const options = dataJSON.questions[4].options;
  const handleOptionPress = option => {
    let updatedOptions;

    if (option === 'None of the above') {
      updatedOptions = [];
    } else {
      updatedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter(selectedOption => selectedOption !== option)
        : [...selectedOptions, option];
    }

    setSelectedOptions(updatedOptions);
    dispatch(setHealthConditionAction(updatedOptions));

    const currentQuestion = questions.find(q => q.id === 11);
    if (currentQuestion && currentQuestion.options.includes(option)) {
      const dependentQuestions = questions.filter(
        q =>
          currentQuestion.dependency &&
          currentQuestion.dependency.includes(q.id.toString()),
      );

      dependentQuestions.forEach(dependentQuestion => {
        const resetAction = getResetActionForQuestion(dependentQuestion);
        dispatch(resetAction);
      });
    }
  };

  const getResetActionForQuestion = question => {
    switch (question.type) {
      case 'number':
        return setSinceHowLongAction('');
      case 'boolean':
        return setMedicationStatusAction(null);
      case 'text':
        return setMedicationDetailsAction('');
      case 'select':
        return setBloodSugarControlAction([]);
      default:
        return null;
    }
  };

  const renderAdditionalQuestions = () => {
    if (!healthCondition || healthCondition === 'None of the above') {
      return null;
    }

    const currentQuestion = questions.find(q => q.id === 11);
    if (!currentQuestion) {
      return null;
    }

    const ailmentOptions = currentQuestion.options;
    const selectedAilment = ailmentOptions.find(o => o === healthCondition);

    if (!selectedAilment) {
      return null;
    }

    return (
      <>
        {selectedAilment.dependency &&
          selectedAilment.dependency.length > 0 && (
            <>
              <Text>{currentQuestion.question}</Text>
              <MultiChoiceField
                options={selectedAilment.dependency}
                onOptionPress={handleOptionPress}
              />

              {questions
                .filter(q =>
                  selectedAilment.dependency.includes(q.id.toString()),
                )
                .map(dependentQuestion => (
                  <React.Fragment key={dependentQuestion.id}>
                    <Text>{dependentQuestion.question}</Text>
                    {renderDependentField(dependentQuestion)}
                  </React.Fragment>
                ))}
            </>
          )}
      </>
    );
  };

  const renderDependentField = question => {
    switch (question.type) {
      case 'number':
        return (
          <TextInput
            value={sinceHowLong}
            onChangeText={duration => dispatch(setSinceHowLongAction(duration))}
            placeholder="Enter duration"
          />
        );
      case 'boolean':
        return (
          <BooleanPicker
            value={medicationStatus}
            onValueChange={status =>
              dispatch(setMedicationStatusAction(status))
            }
          />
        );
      case 'text':
        return (
          <TextInput
            value={medicationDetails}
            onChangeText={details =>
              dispatch(setMedicationDetailsAction(details))
            }
            placeholder="Enter medication details"
          />
        );
      case 'select':
        return (
          <MultiChoiceField
            options={question.options}
            onOptionPress={control =>
              dispatch(setBloodSugarControlAction(control))
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Background />

      <Text style={styles.text}> {dataJSON.questions[4].question}</Text>
      <MultiChoiceField options={options} onOptionPress={handleOptionPress} />

      {renderAdditionalQuestions()}
    </View>
  );
};

export default SurveyScreen;
