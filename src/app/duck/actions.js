import types from './types'

const toggleMyBool = (value) => ({
  type: types.TOGGLE_BOOL,
  value: value
})

const updatePetDetails = payload => ({
  type: types.UPDATE_PET,
  payload: payload
})

const setStep = (step, totalSteps) => ({
  type: types.SET_STEP,
  payload: {
    totalSteps,
    step
  }
})

const nextStep = () => ({
  type: types.NEXT_STEP
})

const prevStep = () => ({
  type: types.PREV_STEP
})

const updateSelection = (questionId,questionStep,optionId) => ({
  type: types.UPDATE_SELECTION,
  payload: {questionId:questionId,step:questionStep,optionId:optionId}
})

const reset = () => ({
  type: types.RESET
})

export default { toggleMyBool, updatePetDetails, nextStep, setStep, prevStep, updateSelection, reset }