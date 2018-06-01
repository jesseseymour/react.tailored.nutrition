import types from './types'


const INITIAL_STATE_OBJECT = 
  {
    myBool: false,
    petDetails: {
      type: "",
      name: ""
    },
    selections: [
      {
        step: 2,
        id: 1,
        optionid: "optionid1"
      }
    ],
    step: 1,
    suggestedProduct: ""
  }

const INITIAL_STATE = (!localStorage["redux-store"]) 
  ? INITIAL_STATE_OBJECT
  : ("app" in JSON.parse(localStorage["redux-store"])) 
  ? JSON.parse(localStorage["redux-store"]).app
  : INITIAL_STATE_OBJECT
  

//const appReducer = (state = INITIAL_STATE, action) => { //uncomment this line to utilize local storage
const appReducer = (state=INITIAL_STATE_OBJECT, action) => {
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
    case types.SET_STEP: {
      return {
        ...state,
        step: action.payload
      }
    }
    case types.NEXT_STEP: {
      return {
        ...state,
        step: state.step + 1
      }
    }
    case types.PREV_STEP: {
      return (
        state.step > 1 ?
          {
            ...state,
            step: state.step - 1
          }
        : state
      )
    }
    case types.UPDATE_SELECTION: {

      const foundIndex = state.selections.findIndex( x => x.id === action.payload.questionId)
      const newSelections = state.selections.map( (x, i) => i === foundIndex ? {...x, optionid: action.payload.optionId} : x)


      const payload = action.payload
      return state
      //gotta get this figured out.
      return {
        ...state,
        //selections: {...state.selections, [parseInt(action.payload.questionId)]: action.payload.optionId}
        selections: {...state.selections, newSelections}
      }
    }
    case types.RESET: {
      return INITIAL_STATE_OBJECT
    }
    default:
      return state
  }
}

export default appReducer