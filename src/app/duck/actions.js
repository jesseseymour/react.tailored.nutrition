import types from './types'


/**
 * Action creators are dispatched to the reducer which then updates the Redux state 
 */

const updatePetName = (payload, petType) => ({
  type: types.UPDATE_PETNAME,
  petType,
  payload
})

const setStep = (step, totalSteps, complete, petType) => ({
  type: types.SET_STEP,
  petType,
  payload: {
    totalSteps,
    step,
    complete
  }
})

const nextStep = (petType) => ({
  type: types.NEXT_STEP,
  petType
})

const prevStep = (petType) => ({
  type: types.PREV_STEP,
  petType
})

const updateSelection = (questionId, questionStep, optionId, petType) => ({
  type: types.UPDATE_SELECTION,
  petType,
  payload: { questionId: questionId, step: questionStep, optionId: optionId}
})

const reset = (petType) => ({
  type: types.RESET,
  petType
})

export default { updatePetName, nextStep, setStep, prevStep, updateSelection, reset }