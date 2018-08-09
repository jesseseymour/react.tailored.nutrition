import { connect } from 'react-redux'
import HomeComponent from './HomeComponent'
import { appOperations } from '../duck'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state, ownProps) => {
  const petType = ownProps.petType
  const { petName, step, selections, completedStep } = state.app[petType]
  return { petName, step, selections, completedStep }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const petType = ownProps.petType
  return {
    updatePetName(name) {
      dispatch(
        appOperations.updatePetName(name, petType)
      )
    },
    setStep(step, totalSteps, complete=false) {
      dispatch(
        appOperations.setStep(step, totalSteps, complete, petType)
      )
      return Promise.resolve()
    },
    nextStep() {
      dispatch(
        appOperations.nextStep(petType)
      )
      //return Promise.resolve()
    }, 
    prevStep() {
      dispatch(
        appOperations.prevStep(petType)
      )
      //return Promise.resolve()
    },
    updateSelection(questionId,questionStep,optionId) {
      dispatch(
        appOperations.updateSelection(questionId, questionStep, optionId, petType)
      )
      return Promise.resolve()
    },
    reset(){
      dispatch(
        appOperations.reset(petType)
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