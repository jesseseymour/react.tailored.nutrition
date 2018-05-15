import types from './types'

const INITIAL_STATE = (localStorage["redux-store"].home) ?
  JSON.parse(localStorage["redux-store"]).home : 
  {
    homeBool: false,
    homeObject: {
      type: "",
      name: ""
    }
  }


const homeReducer = (state=INITIAL_STATE, action) => {
  switch (action.type){
    default:
      return state
  }
}

export default homeReducer