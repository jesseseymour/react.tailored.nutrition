import C from '../constants'
import thunk from 'redux-thunk'
import appReducer from '../reducers'
import { createStore, applyMiddleware } from 'redux'

const consoleMessages = store => next => action => {

  let result

  console.groupCollapsed(`dispatching action => ${action.type}`)
  console.log('default action', store.getState().examples)
  result = next(action)

  let { defaultActions } = store.getState()

  console.log(`

		defaultAction: ${defaultActions}

	`)

  console.groupEnd()

  return result

}

export default ( initialState={} ) => {
  return applyMiddleware(thunk, consoleMessages)(createStore)(appReducer, initialState)
}