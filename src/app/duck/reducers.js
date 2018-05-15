import types from './types'

const INITIAL_STATE = (localStorage["redux-store"]) ?
  JSON.parse(localStorage["redux-store"]).app : 
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


const appReducer = (state=INITIAL_STATE, action) => {
  switch (action.type){
    case types.TOGGLE_BOOL: {
      return {
        ...state,
        myBool: !state.myBool
      }
    }
    case types.UPDATE_PET: {

      if (action.payload != state.petDetails) {
        return {
          ...state,
          petDetails: action.payload
        } 
      }else{
        return state
      }
    }
    default:
      return state
  }
}

export default appReducer