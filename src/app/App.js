import React, { Component } from 'react'
import Home from './home/HomeContainer'
import { BrowserRouter as Router} from 'react-router-dom'

class App extends Component {
  render() {
    return(
      <Router>
        <Home />
      </Router>
    )
  }
}

export default App