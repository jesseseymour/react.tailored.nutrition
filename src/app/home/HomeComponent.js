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
    fetch('/data/questions.json')
      .then(results => results.json())
      .then(questions => this.setState({questions, totalSteps: this.state.totalSteps + questions.length}))
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    const stepFromPathname = this.getStepFromPathname()
    stepFromPathname !== this.props.step ? this.props.setStep(stepFromPathname) : null

    //this.isAppReadyToAdvance()
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

  updateAnswer = (questionId, questionStep, optionId, nextStep = false) => {
    this.props.updateSelection(questionId, questionStep, optionId)
      .then(() => nextStep ? this.redirectToStep(this.props.step + 1) : null)
  }

  isAppReadyToAdvance = () => {
    let advance = false

    switch (this.props.step) {
      case 1 : {
        this.props.petDetails.name ? advance = true : null
      }
      case this.state.totalSteps : {
        advance = false
      }
      default: {
        // questions ? questions.find( question => question.step === this.props.step ) >= 0
        // if (this.props.selections){
        //   Object.entries(this.props.selections)
        // }
      }
    }

    //advance !== this.state.advance ? this.setState({advance}) : null

  }

  readyToAdvance = () => {
    this.setState({advance: true})
  }
  
  render() {
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
                        step={this.props.step}
                        petDetails={this.props.petDetails}
                        handleSubmit={this.updatePetDetails}
                        styles={styles.content} />
                  } />
                <Route
                  exact
                  path="/step/:id"
                  render={
                    props =>
                      <Question
                        {...props}
                        step={this.props.step}
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
          step={this.props.step}
          isReadyToAdvance={this.state.advance}
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