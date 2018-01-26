import React from 'react'
import { render } from 'react-dom'
import App from './App'

window.React = React

let _render = () => {
  const App = require('./App').default
  render(
    <App />,
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