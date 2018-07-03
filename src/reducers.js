import { combineReducers } from 'redux'
import appReducer from  './app/duck/reducers'



const rootReducer = combineReducers({
  app: appReducer
})

export default rootReducer