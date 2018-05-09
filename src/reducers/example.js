import C from '../constants'

const exampleActions = (state = {}, action) => {
  switch (action.type){
    case C.SWITCH_BOOL:
      return state
    default:
      return state
  }
}

export default exampleActions