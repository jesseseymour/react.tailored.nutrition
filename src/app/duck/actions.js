import types from './types'

const updatePetDetails = payload => ({
  type: types.UPDATE_PET,
  payload: payload
})

const setStep = (step, totalSteps, complete) => ({
  type: types.SET_STEP,
  payload: {
    totalSteps,
    step,
    complete
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

export default { updatePetDetails, nextStep, setStep, prevStep, updateSelection, reset }