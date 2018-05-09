import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import consoleMessages from './consoleMessages'


const middleware = applyMiddleware(thunk, consoleMessages)
const store = createStore(rootReducer, middleware)
window.store = store


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