import React, { Component } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Route, Switch, Redirect } from 'react-router-dom'
import StepSelector from './StepSelectorComponent'
import PetDetails from './PetDetailsComponent'
import Question from './QuestionComponent'
import Status from './StatusComponent'
import Results from './ResultsComponent'
import { 
  fetchWithTimeout, 
  handleErrors, 
  getStepFromPathname, 
  redirectToStep,
  hasQuestionBeenAnswered,
  resetApp
} from '../utils'

class HomeComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      questions: null,
      totalSteps: 1,
      advance: false,
      results: null
    }
  }

  componentDidMount = () => {
    fetchWithTimeout(10000,
    fetch('/api/survey/index?survey=dog', {
      headers: {
        'content-type': 'text/xml'
      }
    }))
    .then(handleErrors)
    .then(results => results.json())
    .then(questions => this.setState({questions, totalSteps: this.state.totalSteps + questions.length, loading: false}))
    .then(() => this.checkPath())
    .catch(function(error){
      console.log(error)
    })
  }

  componentDidUpdate = () => {
    const stepFromPathname = getStepFromPathname(this.props.location.pathname)
    stepFromPathname !== this.props.step && stepFromPathname <= this.state.totalSteps && stepFromPathname >= 1 ? (
      this.props.setStep(stepFromPathname, this.state.totalSteps)
        .then(this.setState({advance:false}))
       ) : null
  }

  checkPath = () => {
    const stepFromPathname = getStepFromPathname(this.props.location.pathname)
    const {completedStep} = this.props
    const {totalSteps} = this.state

    //if stepFromPathname is ahead of last completed step, NaN or below 1, redirect to last completed step
    if (
      stepFromPathname > completedStep || 
      !Number.isInteger(stepFromPathname) || 
      stepFromPathname < 1 ||
      this.props.location.pathname.includes('results')
    ){
        return completedStep === totalSteps ? this.submitAnswers() : redirectToStep(this.props.history, completedStep + 1)
    }
    return
  }

  updatePetDetails = (name, type="") => {
    this.setAdvanceState()
    this.props.updatePetDetails({ name, type })
  }

  updateAnswer = ({questionId, questionStep, optionId, updateFn = this.props.updateSelection}) => {
    updateFn(questionId, questionStep, optionId)
      .then(() => this.setAdvanceState())
  }

  isAppReadyToAdvance = () => {
    let advance = false
    if (this.props.step === 1){
      this.props.petDetails.name ? advance = true : null
     }else{
       hasQuestionBeenAnswered(this.props.step, this.props.selections) ? advance = true : null
     }

    return advance
  }

  setAdvanceState = () => {
    this.setState({advance: true})
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
      !this.state.loading ?
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
                        readyToAdvance={this.setAdvanceState}
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


          <p onClick={() => resetApp(this.props.history, this.props.reset(), '/step/1')}>start over</p>
      </div> :
      <div>
        <div className="loading">App is loading</div>
      </div>
    )
  }
}

export default HomeComponent