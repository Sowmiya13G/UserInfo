import * as ActionTypes from '../actionTypes';

const initialState = {
  selectedUnit: 'cm',
  multiChoiceOptions: [],
  smokeOrTobacco: false,
  selectType: null,
  frequency: null,
  healthCondition: [],
  sinceHowLong: null,
  medicationStatus: null,
  medicationDetails: null,
  bloodSugarControl: null,
};

const medReducer = (state = initialState, action) => {
  console.log(action.type);
  console.log('Action:', action);
  console.log('Current State:', state);
  switch (action.type) {
    case ActionTypes.setSelectedUnit:
      console.log('Setting selected unit:', action.payload);
      return {...state, selectedUnit: action.payload};
    case ActionTypes.setMultiChoiceOptions:
      return {...state, multiChoiceOptions: action.payload};
    case ActionTypes.setSmokeOrTobacco:
      return {...state, smokeOrTobacco: action.payload};
    case ActionTypes.setSelectType:
      return {...state, selectType: action.payload};
    case ActionTypes.setFrequency:
      return {...state, frequency: action.payload};
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
    default:
      return state;
  }
};

export default medReducer;
