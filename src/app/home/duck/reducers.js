import types from './types'

const INITIAL_STATE = {
  myBool: false
}

const homeReducer = (state=INITIAL_STATE, action) => {
  switch (action.type){
    case types.TOGGLE_BOOL: {
      return !state
    }
    default:
      return state
  }
}

export default homeReducer