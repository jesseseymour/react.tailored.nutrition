import types from './types'

const toggleMyBool = (value) => ({
  type: types.TOGGLE_BOOL,
  value: value
})

const updatePetDetails = payload => ({
  type: types.UPDATE_PET,
  payload: payload
})

const setStep = payload => ({
  type: types.SET_STEP,
  payload: payload
})

export default { toggleMyBool, updatePetDetails }