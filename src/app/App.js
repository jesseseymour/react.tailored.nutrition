import React, { Component } from 'react'
import Home from './home/HomeContainer'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return(
      <Router>
        <Route 
          render={({ location }) => (
            <Home totalSteps={6} />
          )}
        />
      </Router>
    )
  }
}

export default App