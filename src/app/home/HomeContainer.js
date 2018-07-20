import { connect } from 'react-redux'
import HomeComponent from './HomeComponent'
import { appOperations } from '../duck'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => {
  const { petType, petName, step, selections, completedStep } = state.app
  return { petType, petName, step, selections, completedStep }
}

const mapDispatchToProps = dispatch => {
  return {
    updatePetType(type) {
      dispatch(
        appOperations.updatePetType(type)
      )
    },
    updatePetName(name) {
      dispatch(
        appOperations.updatePetName(name)
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
    updateSelection(questionId,questionStep,optionId,multipleChoice,isExclusive) {
      dispatch(
        appOperations.updateSelection(questionId,questionStep,optionId,multipleChoice,isExclusive)
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