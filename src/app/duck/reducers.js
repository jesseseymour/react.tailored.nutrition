import types from './types'


const INITIAL_STATE_OBJECT =
{
  dog: {
    petName: "",
    selections: [],
    step: 1,
    completedStep: 0,
    suggestedProduct: ""
  },
  cat: {
    petName: "",
    selections: [],
    step: 1,
    completedStep: 0,
    suggestedProduct: ""
  }
}

const INITIAL_STATE = (!localStorage["redux-store"])
  ? INITIAL_STATE_OBJECT
  : ("app" in JSON.parse(localStorage["redux-store"]))
    ? JSON.parse(localStorage["redux-store"]).app
    : INITIAL_STATE_OBJECT


const appReducer = (state = INITIAL_STATE, action) => { //uncomment this line to utilize local storage
  // const appReducer = (state=INITIAL_STATE_OBJECT, action) => {
  switch (action.type) {
    case types.UPDATE_PETNAME: {
      return action.payload !== state[action.petType].petName ?
        {
          ...state,
          [action.petType]: {
            ...state[action.petType],
            petName: action.payload
          }
        } :
        state
    }
    case types.SET_STEP: {
      if (action.payload.complete) {
        return {
          ...state,
          [action.petType]: {
            ...state[action.petType],
            completedStep: action.payload.totalSteps
          }
        }
      }
      if (action.payload.step > state[action.petType].completedStep) {
        return {
          ...state,
          [action.petType]: {
            ...state[action.petType],
            step: action.payload.step,
            completedStep: action.payload.step - 1
          }
        }
      } else {
        return {
          ...state,
          [action.petType]: {
            ...state[action.petType],
            step: action.payload.step
          }
        }
      }
    }
    case types.NEXT_STEP: {
      return {
        ...state,
        [action.petType]:{
          ...state[action.petType],
          step: state[action.petType].step + 1
        }
      }
    }
    case types.PREV_STEP: {
      return (
        state[action.petType].step > 1 ?
          {
            ...state,
            [action.petType]:{
              ...state[action.petType],
              step: state[action.petType].step - 1
            }
          }
          : state
      )
    }
    case types.UPDATE_SELECTION: {

      const foundIndex = state[action.petType].selections.findIndex(x => x.questionId === action.payload.questionId)

      //edit entry if found questionId found in state.selections
      if (foundIndex >= 0) {
        return {
          ...state,
          [action.petType]:{
            ...state[action.petType],
            selections: state[action.petType].selections.map((item, index) => {
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
      }

      //add entry if questionId not found in state.selections
      return {
        ...state,
        [action.petType]:{
          ...state[action.petType],
          selections: [...state[action.petType].selections, action.payload]
        }
        
      }
    }
    case types.RESET: {
      return {
        ...state,
        [action.petType]: INITIAL_STATE_OBJECT[action.petType]
      }
    }
    default:
      return state
  }
}

export default appReducer