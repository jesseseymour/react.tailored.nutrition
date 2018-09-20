import types from './types'

/**
 * IMPORTANT: NEVER MUTATE THE STATE
 * Refer to https://redux.js.org/recipes/structuringreducers/immutableupdatepatterns
 * for directions on how to properly update the redux state object
 */

/**
 * The INITIAL_STATE_OBJECT is how the redux state is structured
 */
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



/**
 * If redux-store does not exists in local 
 * storage, create a new instance
 */
const INITIAL_STATE = (!localStorage["redux-store"])
  ? INITIAL_STATE_OBJECT
  : ("app" in JSON.parse(localStorage["redux-store"]))
    ? JSON.parse(localStorage["redux-store"]).app
    : INITIAL_STATE_OBJECT






const appReducer = (state = INITIAL_STATE, action) => { //uncomment this line to utilize local storage
  // const appReducer = (state=INITIAL_STATE_OBJECT, action) => { //uncomment this line to not save date to local storate...good for dev purposes


  switch (action.type) {
    case types.UPDATE_PETNAME: {
      /**
       * update pet name as input field changes.
       * if name is the same, return state
      */
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
      /**
       * Manually set the current step. 
       * If complete flag is true, also set completedStep to total steps,
       * otherwise set completedStep to current step - 1
       */
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
        [action.petType]: {
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
            [action.petType]: {
              ...state[action.petType],
              step: state[action.petType].step - 1
            }
          }
          : state
      )
    }




    case types.UPDATE_SELECTION: {

      /**
       * Update selected answer
       */


      //search selections. if question has already been answered, proceed to update. otherwise add new entry
      const foundIndex = state[action.petType].selections.findIndex(x => x.questionId === action.payload.questionId)



      //edit entry if found questionId found in state.selections
      if (foundIndex >= 0) {
        return {
          ...state,
          [action.petType]: {
            ...state[action.petType],
            selections: state[action.petType].selections.map((item, index) => { //use array.map to create new array with updated answer | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
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
        [action.petType]: {
          ...state[action.petType],
          selections: [...state[action.petType].selections, action.payload] //use spread operator to insert new item into selections array
        }

      }
    }




    case types.RESET: {
      /**
       * reset redux state for current petType
       * return dog or cat node of INITIAL_STATE_OBJECT
       */
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