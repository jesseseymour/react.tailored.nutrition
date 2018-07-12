import React, { Component } from 'react'
import Home from './home/HomeContainer'
import { BrowserRouter as Router } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <Router key={Math.random()}>
        <Home />
      </Router>
    )
  }
}

export default App