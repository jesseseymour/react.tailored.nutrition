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

    //#region
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
    //#endregion
  }

  redirectToStep = stepNum => {
    this.props.history.push(`/step/${stepNum}`)
  }

  updatePetDetails = (name, type="") => {
    this.props.updatePetDetails({ name, type })
  }

  updateAnswer = (questionIndex, optionIndex) => {
    this.props.updateSelection(questionIndex, optionIndex)
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
                  selection={null}
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
          questions={this.state.questions}
          handleUpdatePet={name => this.updatePetDetails(name)}
          handleSelectionUpdate={(questionIndex, optionIndex) => this.updateAnswer(questionIndex, optionIndex)}
          />
        <p onClick={() => this.props.reset().then(() => this.props.history.push('/step/1'))}>start over</p>
      </div>
    )
  }
}

export default HomeComponent