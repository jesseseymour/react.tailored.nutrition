import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import StepSelector from './StepSelectorComponent'
import Step1 from './Step1Component'
import Step2 from './Step2Component'

class HomeComponent extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  handleChange = (e) => {
    this.setState({name:e.target.value})
  }

  handleSubmit = (name) => {
    this.props.updatePetDetails({name: name, type: ""})
    this.props.setStep(2)
    this.props.history.push('/step/2')
  }

  handleSubmitStep2 = selection => {
    this.props.updateSelection(2,selection)
  }

  render(){
    return (
      <div>
        <Route 
          path="/step/1" 
          render={
            props => 
              <Step1 
                {...props} 
                step={this.props.step}
                petDetails={this.props.petDetails}
                handleSubmit={this.handleSubmit} />
          } />
        <Route
          path="/step/2"
          render={
            props =>
              <Step2
                {...props}
                step={this.props.step}
                petDetails={this.props.petDetails}
                handleSubmit={this.handleSubmitStep2} />
          } />
        {/* <StepSelector 
          step={this.props.step}
          nextStep={this.props.nextStep}
          prevStep={this.props.prevStep} /> */}
      </div>
    )
  }
}

export default HomeComponent