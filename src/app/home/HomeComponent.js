import React, { Component } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Route, Switch, Redirect } from 'react-router-dom'
import StepSelector from './StepSelectorComponent'
import PetDetails from './PetDetailsComponent'
import Question from './QuestionComponent'
import AnsweredQuestions from './AnsweredQuestionsComponent'
import Results from './ResultsComponent'
import ProgressBar from './ProgressBarComponent'
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

  updatePetName = name => {
    this.setAdvanceState()
    this.props.updatePetName(name)
  }

  updateAnswer = ({questionId, questionStep, optionId, updateFn = this.props.updateSelection}) => {
    updateFn(questionId, questionStep, optionId)
      .then(() => this.setAdvanceState())
  }

  isAppReadyToAdvance = () => {
    let advance = false
    if (this.props.step === 1){
      this.props.petName ? advance = true : null
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

  getAnsweredQuestions = () => {
    const { selections } = this.props
    const { questions } = this.state
    let arr = []
    if (selections.length > 0) {
      selections.map((selection, index) => {
        const question = questions.find(question => question.id === selection.questionId)
        const answer = question.options.find(option => option.id === selection.optionId)
        arr.push({ question: question, answer: answer.option })
      })
    }
    return arr
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
                        petDetails={{name:this.props.petName,type:this.props.petType}}
                        handleUpdatePetName={this.updatePetName}
                        styles={styles.content} />
                  } />
                <Route
                  exact
                  path="/step/:id"
                  render={
                    props =>
                      <Question
                        {...props}
                        petName={this.props.petName}
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

        <ProgressBar 
          step={step} 
          totalSteps={totalSteps}
          render={this.props.location.pathname.split('/').indexOf('step') > -1} />

        {this.props.location.pathname.split('/').indexOf('step') > -1 ? 
          <AnsweredQuestions 
            answers={this.getAnsweredQuestions()}
            /> : null}


          <p style={{'cursor':'pointer'}} onClick={() => resetApp(this.props.history, this.props.reset(), '/step/1')}>start over</p>
      </div> :
      <div>
        <div className="loading">App is loading</div>
      </div>
    )
  }
}

export default HomeComponent