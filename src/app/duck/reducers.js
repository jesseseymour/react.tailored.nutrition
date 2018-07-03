import types from './types'


const INITIAL_STATE_OBJECT = 
  {
    petDetails: {
      type: "",
      name: ""
    },
    selections: [],
    step: 1,
    completedStep: 0,
    suggestedProduct: ""
  }

const INITIAL_STATE = (!localStorage["redux-store"]) 
  ? INITIAL_STATE_OBJECT
  : ("app" in JSON.parse(localStorage["redux-store"])) 
  ? JSON.parse(localStorage["redux-store"]).app
  : INITIAL_STATE_OBJECT
  

const appReducer = (state = INITIAL_STATE, action) => { //uncomment this line to utilize local storage
// const appReducer = (state=INITIAL_STATE_OBJECT, action) => {
  switch (action.type){
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
      if(action.payload.complete){
        return {
          ...state,
          completedStep: action.payload.totalSteps
        }
      }
      if(action.payload.step > state.completedStep){
        return {
          ...state,
          step: action.payload.step,
          completedStep: action.payload.step - 1
        }
      }else{
        return {
          ...state,
          step: action.payload.step
        }
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

      const foundIndex = state.selections.findIndex( x => x.questionId === action.payload.questionId)

      //edit entry if found questionId found in state.selections
      if (foundIndex >= 0) {
        return {
          ...state,
          selections: state.selections.map((item,index) => {
            if (index !== foundIndex) {
              return item
            }

            return {
              ...item,
              ...action.payload
            }
          })
        }
      }

      //add entry if questionId not found in state.selections
      return {
        ...state,
        selections: [...state.selections, action.payload]
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