import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import StepSelector from './StepSelectorComponent'
import PetDetails from './PetDetailsComponent'
import Question from './QuestionComponent'
import Status from './StatusComponent'

class HomeComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questions:null
    }
  }

  componentDidMount = () => {

    fetch('/data/questions.json')
      .then(results => results.json())
      .then(questions => this.setState({questions}))


    /*const pathArr = this.props.location.pathname.split('/')
    let stepNum

     if (pathArr.indexOf('step') >= 0 && pathArr.length > 2) {
      stepNum = parseInt(pathArr[pathArr.indexOf('step') + 1])
      if (stepNum !== this.props.step) {
        //this.redirectToStep(this.props.step)
      }
    } else {
      //this.props.history.push(`/step/1`)
    } */
  }

  redirectToStep = stepNum => {
    this.props.history.push(`/step/${stepNum}`)
  }

  updatePetDetails = (name, type="") => {
    this.props.updatePetDetails({ name, type })
  }

  updateAnswer = selection => {
    this.props.updateSelection(this.props.step, selection)
  }

  render() {
    return (
      <div>
        <Switch>
          <Route
            path="/step/1"
            render={
              props =>
                <PetDetails
                  {...props}
                  step={this.props.step}
                  petDetails={this.props.petDetails}
                  handleSubmit={this.updatePetDetails} />
            } />
          <Route
            path="/step/:id"
            render={
              props =>
                <Question
                  {...props}
                  step={this.props.step}
                  questions={this.state.questions ? this.state.questions : null}
                  handleSubmit={this.updateAnswer} />
            } />
        </Switch>
        <StepSelector 
          step={this.props.step}
          nextStep={() => this.props.nextStep().then(() => this.props.history.push(`/step/${this.props.step}`))}
          prevStep={() => this.props.prevStep().then(() => this.props.history.push(`/step/${this.props.step}`))} />
        <Status 
          petName={this.props.petDetails.name} 
          selections={this.props.selections}
          handleUpdatePet={name => this.updatePetDetails(name)}
          />
        <p onClick={() => this.props.reset().then(() => this.props.history.push('/step/1'))}>start over</p>
      </div>
    )
  }
}

export default HomeComponent