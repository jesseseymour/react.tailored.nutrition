import types from './types'

const INITIAL_STATE = (localStorage["redux-store"]) ?
  JSON.parse(localStorage["redux-store"]) : 
  {
    myBool: false,
    petDetails: {
      type: "",
      name: ""
    },
    selections: {},
    step: 0,
    suggestedProduct: ""
  }


const homeReducer = (state=INITIAL_STATE, action) => {
  switch (action.type){
    case types.TOGGLE_BOOL: {
      return !state
    }
    case types.UPDATE_PET: {
      const newState = state
      state.home.petDetails.name !== action.payload ? newState.petDetails.name = action.payload : null
      return newState === state ? state : newState
    }
    default:
      return state
  }
}

export default homeReducer