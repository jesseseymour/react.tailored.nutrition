import React, { Component } from 'react'
import Home from './home/HomeContainer'
import { BrowserRouter as Router } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    var rootData = JSON.parse(document.getElementById('react-container').dataset.root); //take root data from page source and pass to application


    
    /**
     * Initialize the React Router and nest the Home Container
     */
    return(
      <Router key={Math.random()}>
        <Home 
          baseUrl={rootData.baseUrl} 
          petType={rootData.petType} />
      </Router>
    )




  }
}

export default App