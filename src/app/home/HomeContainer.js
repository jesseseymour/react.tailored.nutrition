import { connect } from 'react-redux'
import HomeComponent from './HomeComponent'
import { appOperations } from '../duck'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state, ownProps) => {
  /**
   * Pull items from Redux store and attach as props.
   * We are sure to pull only the data from the 
   * store that matches the petType (dog or cat)
   */
  const petType = ownProps.petType
  const { petName, step, selections, completedStep } = state.app[petType]
  return { petName, step, selections, completedStep }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  /**
   * Pass Redux dispatchers as props
   */
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
    }, 
    prevStep() {
      dispatch(
        appOperations.prevStep(petType)
      )
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