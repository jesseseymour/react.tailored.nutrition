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
  resetApp,
  priceSpiderRebind,
  scrollTo
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
    //fetch('./data/questions.json'))
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
    priceSpiderRebind()
    this.updateScrollPosition()
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

  nextStep = (e) => {
    e.preventDefault()
    this.props.step === this.state.totalSteps ? this.props.history.push('/results') : this.props.history.push(`/step/${this.props.step + 1}`)
  }

  prevStep = (e) => {
    e.preventDefault()
    this.props.location.pathname.split('/').indexOf('results') > -1 ? this.props.history.push(`/step/${this.props.step}`) : this.props.history.push(`/step/${this.props.step - 1}`)
  } 

  updateScrollPosition = () => {
    const stepFromPathname = getStepFromPathname(this.props.location.pathname)
    const element = stepFromPathname === 1 ? ".tntool__banner--finder" : ".tntool__banner--results, .tntool__banner--question"
    scrollTo(element, 1000)
  }

  updatePetDetails = (name, type="") => {
    this.setAdvanceState()
    this.props.updatePetDetails({ name, type })
  }

  updatePetName = name => {
    this.setAdvanceState()
    this.props.updatePetName(name)
  }

  updateAnswer = (params, updateFn = this.props.updateSelection) => {
    const {questionId, questionStep, optionId, isExclusive, exclusiveOptions} = params
    let options = [optionId]
    if(!isExclusive){
      let currentSelections = this.props.selections.find(item => item.questionId === questionId)
      
      if (currentSelections){
        let currentOptions = currentSelections.optionId.filter(
          function(option){
            return exclusiveOptions.findIndex(exclusiveOption => exclusiveOption.id === option) === -1
          }
        )
        for (let i = 0; i < currentOptions.length; i++){
          let index = exclusiveOptions.findIndex(exclusiveOption => exclusiveOption.id === currentOptions[i])
        }
        currentOptions.indexOf(optionId) > -1 ? currentOptions.splice(currentOptions.indexOf(optionId),1) : currentOptions.push(optionId)
        options = currentOptions
      }
    }
    updateFn(questionId, questionStep, options)
      .then(() => this.isAppReadyToAdvance() ? this.setAdvanceState() : this.setAdvanceState(false))
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

  setAdvanceState = (advance = true) => {
    this.setState({advance: advance})
  }

  submitAnswers = () => {
    Promise.resolve(this.props.history.push('/results'))
      .then(this.fetchResults())
  }

  fetchResults = () => {
    const optionsStr = `[${this.props.selections.map(option => `[${option.optionId.map(id => `"${id}"`)}]`)}]`
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
    let answerArr = []

    if (selections.length > 0) {
      selections.map((selection, index) => {
        const question = questions.find(question => question.id === selection.questionId)
        
        const answers = selection.optionId.map(selection => {
          const answer = question.options.find(option => option.id === selection)
          answerArr.push(answer.option)
        })
      })
    }
    return answerArr
  }
  
  render() {
    const { step } = this.props
    const { totalSteps } = this.state
    const styles = {}
    const stepFromPathname = getStepFromPathname(this.props.location.pathname)
    let height = "0px"
    switch (step) {
      case 1 :
        height = "250px"
        break
      case 2 : 
        height = "450px"
        break
      default:
        height = "1000px"
        break
    }
    styles.content = {
      position: "absolute",
      background: "white",
      left: 0,
      right: 0,
      top: "0",
      bottom: 0
    };

    styles.container = {
      position: "relative",
      height: height
    }
    return (
      !this.state.loading ?
      <div>
          <div className='tntool__container' data-step={Number.isInteger(stepFromPathname) ? stepFromPathname : "results"}>
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
                        styles={styles.content}
                        scrollTo={scrollTo} />
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
                        selections={this.props.selections}
                        questions={this.state.questions ? this.state.questions : null}
                        updateAnswer={this.updateAnswer}
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
                        petName={this.props.petName}
                        resetApp={() => resetApp(this.props.history, this.props.reset(), '/step/1')}
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
          nextStep={(e) => this.nextStep(e)}
          prevStep={(e) => this.prevStep(e)}
          getResults={() => this.submitAnswers()} />

        <ProgressBar 
          step={step} 
          totalSteps={totalSteps}
          render={this.props.location.pathname.split('/').indexOf('step') > -1} />

        {this.props.location.pathname.split('/').indexOf('step') > -1 ? 
          <AnsweredQuestions 
            answers={this.getAnsweredQuestions()}
            /> : null}


      </div> :
      <div>
        <div className="loading">App is loading</div>
      </div>
    )
  }
}

export default HomeComponent