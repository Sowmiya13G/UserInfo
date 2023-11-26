import * as ActionTypes from '../actionTypes';

export const setSelectedUnitAction = unit => {
  console.log('Dispatching action with unit:', unit);
  return {
    type: ActionTypes.setSelectedUnit,
    payload: unit,
  };
};
export const setMultiChoiceOptionsAction = options => {
  console.log('Dispatching setMultiChoiceOptionsAction with options:', options);
  return {
    type: ActionTypes.setMultiChoiceOptions,
    payload: options,
  };
};

export const setSmokeOrTobaccoAction = value => ({
  type: ActionTypes.setSmokeOrTobacco,
  payload: value,
});

export const setSelectTypeAction = value => ({
  type: ActionTypes.setSelectType,
  payload: value,
});

export const setFrequencyAction = value => ({
  type: ActionTypes.setFrequency,
  payload: value,
});

export const setHealthConditionAction = condition => ({
  type: ActionTypes.setHealthCondition,
  payload: condition,
});

export const setSinceHowLongAction = duration => ({
  type: ActionTypes.setSinceHowLong,
  payload: duration,
});

export const setMedicationStatusAction = status => ({
  type: ActionTypes.setMedicationStatus,
  payload: status,
});

export const setMedicationDetailsAction = details => ({
  type: ActionTypes.setMedicationDetails,
  payload: details,
});

export const setBloodSugarControlAction = control => ({
  type: ActionTypes.setBloodSugarControl,
  payload: control,
});

// export const setSelectedUnitAction = unit => ({
//   type: ActionTypes.setSelectedUnit,
//   payload: unit,
// });
