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
  updateInlineRatings,
  scrollTo
} from '../utils'

class HomeComponent extends Component {
  constructor(props) {
    super(props)

    //set initial state
    this.state = {
      loading: true,
      questions: null,
      totalSteps: 1,
      advance: false,
      results: null
    }
  }

  componentDidMount = () => {

    //fetch questions for specific petType (dog or cat)
    fetchWithTimeout(10000,
    fetch(`/api/survey/index?survey=${this.props.petType}`, {
      headers: {
        'content-type': 'text/xml'
      }
    }))
    .then(handleErrors)
    .then(results => results.json())
    .then(questions => {
      this.setState(
        {
          questions, //log questions to state
          totalSteps: this.state.totalSteps + questions.length, //add number of questions to totalSteps from the initial state
          loading: false
        }
      )
    })
    .then(() => this.checkPath()) //check for a valid url pathname
    .catch(function(error){
      console.log(error)
    })
  }

  componentDidUpdate = (prevProps) => {
    const stepFromPathname = getStepFromPathname(this.props.location.pathname)
    //this.props.location.pathname.includes('results') && this.props.location.pathname !== prevProps.location.pathname ? priceSpiderRebind() : null

    //only update the scroll position on step change
    this.props.location.pathname !== prevProps.location.pathname && this.props.step !== 1 ? this.updateScrollPosition() : null
    if (this.props.step !== prevProps.step && this.props.location.pathname === prevProps.location.pathname){
      this.updateScrollPosition()
    }

    //set redux step and prevent app from being able to advance
    stepFromPathname !== this.props.step && stepFromPathname <= this.state.totalSteps && stepFromPathname >= 1 ? (
      this.props.setStep(stepFromPathname, this.state.totalSteps)
        .then(this.setState({advance:false}))
       ) : null
  }

  checkPath = () => {
    const stepFromPathname = getStepFromPathname(this.props.location.pathname) //gets the step number from the pathname
    const {completedStep} = this.props
    const {totalSteps} = this.state

    //if stepFromPathname is either ahead of last completed step, NaN or below 1, redirect to last completed step
    if (
      stepFromPathname > completedStep || 
      !Number.isInteger(stepFromPathname) || 
      stepFromPathname < 1 ||
      this.props.location.pathname.includes('results')
    ){
      return completedStep === totalSteps ? this.submitAnswers() : redirectToStep(this.props.history, completedStep + 1, this.props.baseUrl)
    }
    return
  }


  /**
   * nextStep and prevStep update pathname to next or previous step
   */
  nextStep = (e) => {
    e.preventDefault()
    this.props.step === this.state.totalSteps ? this.props.history.push(`/${this.props.baseUrl}/results`) : this.props.history.push(`/${this.props.baseUrl}/step/${this.props.step + 1}`)
  }

  prevStep = (e) => {
    e.preventDefault()
    this.props.location.pathname.split('/').indexOf('results') > -1 ? this.props.history.push(`/${this.props.baseUrl}/step/${this.props.step}`) : this.props.history.push(`/${this.props.baseUrl}/step/${this.props.step - 1}`)
  } 


  
  updateScrollPosition = () => {
    const stepFromPathname = getStepFromPathname(this.props.location.pathname)
    if(stepFromPathname === 1) return
    const element = stepFromPathname === 1 ? ".tntool__banner--finder" : ".tntool__banner--results, .tntool__banner--question"
    scrollTo(element, 1000)
  }

  // updatePetDetails = (name, type="") => {
  //   this.setAdvanceState()
  //   this.props.updatePetDetails({ name, type })
  // }


  //update pet name when input field is changed and allow app to advance
  updatePetName = name => {
    this.setAdvanceState()
    this.props.updatePetName(name)
  }


  /**
   * Answers are sent as arrays.
   * If a user selects an exclusive option, an array is sent with only that option.
   * If a user selects a non-exclusive option, the arrays is updated if answer
   * exists. Otherwise, the answer is added the array.
   * 
   * When the answer is submitted, state is updated to allow the app to advance
   */
  updateAnswer = params => {
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
    this.props.updateSelection(questionId, questionStep, options)
      .then(() => this.isAppReadyToAdvance() ? this.setAdvanceState() : this.setAdvanceState(false))
  }



  /**
   * If on step 1, check for a pet name.
   * If on any step after 1, check to see if question has been answered.
   * If yes, return true
   */
  isAppReadyToAdvance = () => {
    let advance = false
    if (this.props.step === 1){
      this.props.petName ? advance = true : null
     }else{
       hasQuestionBeenAnswered(this.props.step, this.props.selections) ? advance = true : null
     }

    return advance
  }



  /**
   * set advance flag in state to true
   */
  setAdvanceState = (advance = true) => {
    this.setState({advance: advance})
  }


  /**
   * Set pathname and wait for that to complete.
   * When complete, fetch results
   */
  submitAnswers = () => {
    Promise.resolve(this.props.history.push(`/${this.props.baseUrl}/results`))
      .then(this.fetchResults())
  }



  /**
   * send answers to web service, which will then send back recommended products.
   * once recos come back, set completedStep and update price spider and bv stars.
   */
  fetchResults = () => {
    const optionsStr = `[${this.props.selections.map(option => `[${option.optionId.map(id => `"${id}"`)}]`)}]`
    fetch(`/api/survey/recommendation?options=${optionsStr}`, {
      headers: {
        'content-type': 'text/xml'
      }
    })
      .then(this.handleErrors)
      .then(results => results.json())
      .then(results => {
        this.setState({results})
        return results
      })
      .then(results => {
        this.props.setStep(this.state.totalSteps, this.state.totalSteps, true)
        return results
      })
      .then(results => {
        let bvArr = [results.product.bvID]
        results.ymal.map( product => product.bvID.length && bvArr.indexOf(product.bvID) === -1 ? bvArr.push(product.bvID) : null)
        priceSpiderRebind()
        updateInlineRatings(bvArr)
      })
  }


  /**
   * helper function to get list of answers to completed questions
   */
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

  /**
   * call resetApp helper function and scroll to top of page
   */
  resetApp = () => {
    scrollTo(".tntool__banner--finder", 1000)
    resetApp(this.props.history, this.props.reset(), `/${this.props.baseUrl}/step/1`)
  }
  
  render() {
    const { step } = this.props
    const { totalSteps } = this.state
    const styles = {}
    const stepFromPathname = getStepFromPathname(this.props.location.pathname)
    
    styles.content = {
      //position: "absolute",
      //background: "white",
      // left: 0,
      // right: 0,
      // top: "0",
      // bottom: 0
    };

    styles.container = {
      //position: "relative",
      minHeight: "300px"
      //height: height
    }
    return (
      !this.state.loading ?
      <div>
          <div className='tntool__container' data-step={Number.isInteger(stepFromPathname) ? stepFromPathname : "results"}>
          <Route exact path='/' render={() => <Redirect to={`/${this.props.baseUrl}/step/1`} />} />
          {/* <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames='fade' timeout={300}> */}
              <Switch location={this.props.location}>
                <Route
                  exact
                  path={`/${this.props.baseUrl}/step/1`}
                  render={
                    props =>
                      <PetDetails
                        {...props}
                        step={step}
                        petType={this.props.petType}
                        petDetails={{name:this.props.petName}}
                        handleUpdatePetName={this.updatePetName}
                        styles={styles.content}
                        scrollTo={scrollTo} />
                  } />
                <Route
                  exact
                    path={`/${this.props.baseUrl}/step/:id`}
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
                    path={`/${this.props.baseUrl}/results`}
                  render={
                    props =>
                      <Results
                        {...props}
                        styles={styles.content}
                        results={this.state.results}
                        petName={this.props.petName}
                        petType={this.props.petType}
                        resetApp={this.resetApp}
                        //resetApp={() => resetApp(this.props.history, this.props.reset(), `/${this.props.baseUrl}/step/1`)}
                        />
                  }
                />
              </Switch>
            {/* </CSSTransition>
          </TransitionGroup> */}
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
          render={this.props.location.pathname.split('/').indexOf('step') > -1} 
          petType={this.props.petType}/>

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