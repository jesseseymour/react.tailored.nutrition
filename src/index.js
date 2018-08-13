import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'


const middleware = applyMiddleware(thunk)


const saveState = () => localStorage['redux-store'] = JSON.stringify(store.getState())

const store = process.env.NODE_ENV !== 'production' ? createStore(
  rootReducer, 
  compose(
    middleware, 
   //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //uncomment if you wish to use the Redux devtools browser extension
  )
) : createStore(
  rootReducer,
  compose(middleware)
)
store.subscribe(saveState)



let _render = () => {
  const App = require('./app/App').default
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('react-container')
  )
}

if (module.hot) {
  const renderApp = _render;
  _render = () => {
    try {
      renderApp()
    }
    catch(error) {
      console.log(error)
    }
  }

  module.hot.accept("./app/App.js", () => {
    setTimeout(_render)
  })
}

_render()