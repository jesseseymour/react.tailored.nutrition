import { connect } from 'react-redux'
import HomeComponent from './HomeComponent'
import { appOperations } from '../duck'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => {
  const { petDetails, step, selections, completedStep } = state.app
  return { petDetails, step, selections, completedStep }
}

const mapDispatchToProps = dispatch => {
  return {
    updatePetDetails(payload) {
      dispatch(
        appOperations.updatePetDetails(payload)
      )
    },
    setStep(step, totalSteps, complete=false) {
      dispatch(
        appOperations.setStep(step, totalSteps, complete)
      )
      return Promise.resolve()
    },
    nextStep() {
      dispatch(
        appOperations.nextStep()
      )
      //return Promise.resolve()
    }, 
    prevStep() {
      dispatch(
        appOperations.prevStep()
      )
      //return Promise.resolve()
    },
    updateSelection(questionIndex,questionStep,optionIndex) {
      dispatch(
        appOperations.updateSelection(questionIndex,questionStep,optionIndex)
      )
      return Promise.resolve()
    },
    reset(){
      dispatch(
        appOperations.reset()
      )
      return Promise.resolve()
    }
  }
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent)

export default withRouter(HomeContainer)