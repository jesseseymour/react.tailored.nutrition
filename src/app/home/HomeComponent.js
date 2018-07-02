import React, { Component } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Route, Switch, Redirect } from 'react-router-dom'
import StepSelector from './StepSelectorComponent'
import PetDetails from './PetDetailsComponent'
import Question from './QuestionComponent'
import Status from './StatusComponent'
import Results from './ResultsComponent'

class HomeComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      questions: null,
      totalSteps: 1,
      advance: false,
      results: null
    }
  }

  componentDidMount = () => {
    fetch('/api/survey/index?survey=dog', {
      headers: {
        'content-type': 'text/xml'
      }
    })
    .then(this.handleErrors)
    .then(results => results.json())
    .then(questions => this.setState({questions, totalSteps: this.state.totalSteps + questions.length}))
    .then(() => this.checkPath())
  }

  componentDidUpdate = () => {
    const stepFromPathname = this.getStepFromPathname()
    stepFromPathname !== this.props.step && stepFromPathname <= this.state.totalSteps && stepFromPathname >= 1 ? (
      this.props.setStep(stepFromPathname, this.state.totalSteps)
        .then(this.setState({advance:false}))
       ) : null
  }

  handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText)
    }
    return response
  }

  checkPath = () => {
    const stepFromPathname = this.getStepFromPathname()
    const {completedStep} = this.props
    const {totalSteps} = this.state

    //if stepFromPathname is ahead of last completed step, NaN or below 1, redirect to last completed step
    if (
      stepFromPathname > completedStep || 
      !Number.isInteger(stepFromPathname) || 
      stepFromPathname < 1 ||
      this.props.location.pathname.includes('results')
    ){
        return completedStep === totalSteps ? this.submitAnswers() : this.redirectToStep(completedStep + 1)
    }
    return
  }

  getStepFromPathname = () => {
    const pathnameArr = this.props.location.pathname.split('/')
    return parseInt(pathnameArr[pathnameArr.indexOf('step') + 1])
  }

  redirectToStep = step => {
    this.props.history.push(`/step/${step}`)
  }

  updatePetDetails = (name, type="") => {
    this.readyToAdvance()
    this.props.updatePetDetails({ name, type })
  }

  updateAnswer = ({questionId, questionStep, optionId, updateFn = this.props.updateSelection}) => {
    updateFn(questionId, questionStep, optionId)
      .then(() => this.readyToAdvance())
  }

  hasQuestionBeenAnswered = (step) => this.props.selections.findIndex(selection => selection.step === step) > -1

  isAppReadyToAdvance = () => {
    let advance = false

    switch (this.props.step) {
      case 1 : {
        this.props.petDetails.name ? advance = true : null
      }
      default: {
        this.hasQuestionBeenAnswered(this.props.step) ? advance = true : null
      }
    }

    return advance
  }

  readyToAdvance = () => {
    this.setState({advance: true})
  }

  resetApp = () => {
    //reset redux state after updating history
    Promise.resolve(this.props.history.push('/step/1')).then(this.props.reset())
  }

  submitAnswers = () => {
    Promise.resolve(this.props.history.push('/results'))
      .then(this.fetchResults())
  }

  fetchResults = () => {
    const optionsStr = `[${this.props.selections.map(option => `"${option.optionId}"`)}]`
    fetch(`/api/survey/recommendation?options=${optionsStr}`, {
      headers: {
        'content-type': 'text/xml'
      }
    })
      .then(this.handleErrors)
      .then(results => results.json())
      .then(results => this.setState({results}))
      .then(() => this.props.setStep(this.state.totalSteps, this.state.totalSteps, true))
  }
  
  render() {
    const { step } = this.props
    const { totalSteps } = this.state
    const styles = {};

    styles.content = {
      position: "absolute",
      background: "white",
      left: 0,
      right: 0,
      top: "0",
      bottom: 0
    };

    styles.container ={
      position: "relative",
      height: "300px"
    }
    return (
      <div>
        <div style={styles.container}>
          <Route exact path='/' render={() => <Redirect to='/step/1' />} />
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames='fade' timeout={300}>
              <Switch location={this.props.location}>
                <Route
                  exact
                  path="/step/1"
                  render={
                    props =>
                      <PetDetails
                        {...props}
                        step={step}
                        petDetails={this.props.petDetails}
                        handleUpdatePetDetails={this.updatePetDetails}
                        styles={styles.content} />
                  } />
                <Route
                  exact
                  path="/step/:id"
                  render={
                    props =>
                      <Question
                        {...props}
                        petName={this.props.petDetails.name}
                        step={step}
                        selection={null}
                        questions={this.state.questions ? this.state.questions : null}
                        handleSubmit={this.updateAnswer}
                        readyToAdvance={this.readyToAdvance}
                        styles={styles.content} />
                  } />
                <Route
                  path="/results"
                  render={
                    props =>
                      <Results
                        {...props}
                        styles={styles.content}
                        results={this.state.results}
                        />
                  }
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <StepSelector 
          next={step < totalSteps}
          prev={step > 1}
          results={step === totalSteps && this.props.location.pathname.split('/').indexOf('step') > -1}
          isReadyToAdvance={this.isAppReadyToAdvance() ? true : this.state.advance}
          nextStep={() => this.props.step === this.state.totalSteps ? this.props.history.push('/results') : this.props.history.push(`/step/${this.props.step + 1}`)}
          prevStep={() => this.props.location.pathname.split('/').indexOf('results') > -1 ? this.props.history.push(`/step/${this.props.step}`) : this.props.history.push(`/step/${this.props.step - 1}`)} 
          getResults={() => this.submitAnswers()} />


        {this.props.location.pathname.split('/').indexOf('step') > -1 ? 
          <Status 
            petName={this.props.petDetails.name} 
            selections={this.props.selections}
            questions={this.state.questions}
            handleUpdatePet={name => this.updatePetDetails(name)}
            handleSelectionUpdate={(questionId, step, optionId) => this.updateAnswer(questionId, step, optionId)}
            step={this.props.step}
            /> : null}


        <p onClick={() => this.resetApp()}>start over</p>
      </div>
    )
  }
}

export default HomeComponent