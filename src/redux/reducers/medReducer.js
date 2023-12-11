import * as ActionTypes from '../actionTypes';

const initialState = {
  selectedUnit: [],
  textInputValue: '',
  multiChoiceOptions: [],
  smokeOrTobacco: false,
  selectType: [],
  frequency: '',
  textInputFrequency: '',
  healthCondition: [],
  sinceHowLong: null,
  medicationStatus: null,
  medicationDetails: null,
  bloodSugarControl: null,
};

const medReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.setSelectedUnit:
      console.log('Setting selected unit:', action.payload);
      return {...state, selectedUnit: action.payload};
    case ActionTypes.setTextInputValue:
      return {...state, textInputValue: action.payload};
    case ActionTypes.setMultiChoiceOptions:
      return {...state, multiChoiceOptions: action.payload};
    case ActionTypes.setSmokeOrTobacco:
      return {...state, smokeOrTobacco: action.payload};
    case ActionTypes.setSelectType:
      return {...state, selectType: action.payload};
    case ActionTypes.setFrequency:
      return {...state, frequency: action.payload};
    case ActionTypes.setTextInputFrequency:
      return {...state, textInputFrequency: action.payload};
    case ActionTypes.setHealthCondition:
      return {...state, healthCondition: action.payload};
    case ActionTypes.setSinceHowLong:
      return {...state, sinceHowLong: action.payload};
    case ActionTypes.setMedicationStatus:
      return {...state, medicationStatus: action.payload};
    case ActionTypes.setMedicationDetails:
      return {...state, medicationDetails: action.payload};
    case ActionTypes.setBloodSugarControl:
      return {...state, bloodSugarControl: action.payload};
    case ActionTypes.clearMed:
      return initialState;
    default:
      return state;
  }
};

export default medReducer;
