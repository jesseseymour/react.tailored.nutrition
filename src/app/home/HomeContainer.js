import { connect } from 'react-redux'
import HomeComponent from './HomeComponent'
import { homeOperations } from './duck'
import { appOperations } from '../duck'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => {
  const { myBool, petDetails, step, selections } = state.app
  return { myBool, petDetails, step, selections }
}

const mapDispatchToProps = dispatch => {
  return { 
    toggleMyBool(bool) {
      dispatch(
        appOperations.toggleMyBool()
      )
    },
    updatePetDetails(payload) {
      dispatch(
        appOperations.updatePetDetails(payload)
      )
    },
    setStep(step) {
      dispatch(
        appOperations.setStep(step)
      )
      return Promise.resolve()
    },
    nextStep() {
      dispatch(
        appOperations.nextStep()
      )
      return Promise.resolve()
    },
    prevStep() {
      dispatch(
        appOperations.prevStep()
      )
      return Promise.resolve()
    },
    updateSelection(questionIndex,optionIndex) {
      dispatch(
        appOperations.updateSelection(questionIndex,optionIndex)
      )
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