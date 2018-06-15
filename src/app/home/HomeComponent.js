import React, { Component } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Route, Switch, Redirect } from 'react-router-dom'
import StepSelector from './StepSelectorComponent'
import PetDetails from './PetDetailsComponent'
import Question from './QuestionComponent'
import Status from './StatusComponent'

class HomeComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: null,
      totalSteps: 2,
      advance: false
    }
  }

  componentDidMount = () => {
    // const stepFromPathname = this.getStepFromPathname()
    // if(stepFromPathname > 0 && stepFromPathname <= this.props.totalSteps && this.props.step > 0 && this.props.step <= this.props.totalSteps){
    //   if(this.props.step < stepFromPathname){
    //     this.hasQuestionBeenAnswered(this.props.step) ? this.props.history.push(`/step/${this.props.step + 1}`) : this.props.history.push(`/step/${this.props.step}`)
    //   }
    // }
    this.checkPath()
    fetch('/data/questions.json')
      .then(results => results.json())
      .then(questions => this.setState({questions, totalSteps: this.state.totalSteps + questions.length}))
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    const stepFromPathname = this.getStepFromPathname()
    stepFromPathname !== this.props.step && stepFromPathname <= this.props.totalSteps && stepFromPathname >= 1 ? (
      this.props.setStep(stepFromPathname)
        .then(this.setState({advance:false}))
       ) : null
  }

  checkPath = () => {
    const stepFromPathname = this.getStepFromPathname()
    let step = 1
    if (!Number.isInteger(stepFromPathname)){
      //step from path is not an integer
      //return step 1
      return step
    }

    if (
      stepFromPathname > 0 && 
      stepFromPathname <= this.props.totalSteps && 
      this.props.step > 0 && 
      this.props.step <= this.props.totalSteps)
    {
      //step from path is in range
      if (this.props.step < stepFromPathname){
        //step from path is beyond latest step in redux
        //send to step after last completed step
        step = this.hasQuestionBeenAnswered(this.props.step) ? this.props.step + 1 : this.props.step
      } else {
        //step from path is valid
        step = this.props.step
      }
    }
    else
    {
      //step from path is out of range
      //determine last completed step and return
      if (this.props.step === 1 && this.props.petDetails.petName){
        step = 2
      }
      else
      {
        step = this.hasQuestionBeenAnswered(this.props.step) ? this.props.step + 1 : this.props.step
      }
    }

    return step
  }

  isValidStep = () => {
    const stepFromPathname = this.getStepFromPathname()
    if ((this.props.step > 0 && stepFromPathname > this.props.step || (this.props.step > this.props.totalSteps || this.props.step < 1))){
      return false
    }
    return true
  }

  getStepFromPathname = () => {
    const pathnameArr = this.props.location.pathname.split('/')
    return parseInt(pathnameArr[pathnameArr.indexOf('step') + 1])
  }

  redirectToStep = step => {
    //this.setState({advance: false})
    this.props.history.push(`/step/${step}`)
  }

  updatePetDetails = (name, type="") => {
    this.readyToAdvance()
    this.props.updatePetDetails({ name, type })
  }

  updateAnswer = ({questionId, questionStep, optionId, nextStep = false}) => {
    this.props.updateSelection(questionId, questionStep, optionId)
      //.then(() => nextStep ? this.redirectToStep(this.props.step + 1) : null)
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
  
  render() {
    const {totalSteps,step} = this.props
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
                        step={step}
                        selection={null}
                        questions={this.state.questions ? this.state.questions : null}
                        handleSubmit={this.updateAnswer}
                        readyToAdvance={this.readyToAdvance}
                        styles={styles.content} />
                  } />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <StepSelector 
          next={step < totalSteps}
          prev={step > 1}
          isReadyToAdvance={this.isAppReadyToAdvance() ? true : this.state.advance}
          nextStep={() => this.props.history.push(`/step/${this.props.step + 1}`)}
          prevStep={() => this.props.history.push(`/step/${this.props.step - 1}`)} />
        <Status 
          petName={this.props.petDetails.name} 
          selections={this.props.selections}
          questions={this.state.questions}
          handleUpdatePet={name => this.updatePetDetails(name)}
          handleSelectionUpdate={(questionId, step, optionId) => this.updateAnswer(questionId, step, optionId)}
          step={this.props.step}
          />
        <p onClick={() => this.props.reset().then(() => this.props.history.push('/step/1'))}>start over</p>
      </div>
    )
  }
}

export default HomeComponent