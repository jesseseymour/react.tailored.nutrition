import React, { Component } from 'react'
import Home from './home/HomeContainer'
import { BrowserRouter as Router } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    var rootData = JSON.parse(document.getElementById('react-container').dataset.root);
    return(
      <Router key={Math.random()}>
        <Home rootData={rootData} />
      </Router>
    )
  }
}

export default App