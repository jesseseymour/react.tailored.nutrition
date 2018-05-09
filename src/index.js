import React from 'react'
import { render } from 'react-dom'
import storeFactory from './store/configureStore'
import { Provider } from 'react-redux'

window.React = React

const initialState = (localStorage['redux-store']) ? JSON.parse(localStorage['redux-store']) : {'defaultActions':false}

const saveState = () => localStorage['redux-store'] = JSON.stringify(store.getState())

const store = storeFactory()
store.subscribe(saveState)

window.store = store

let _render = () => {
  const App = require('./App').default
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

  module.hot.accept("./App.js", () => {
    setTimeout(_render)
  })
}

_render()