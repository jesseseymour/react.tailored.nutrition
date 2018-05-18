import { connect } from 'react-redux'
import HomeComponent from './HomeComponent'
import { homeOperations } from './duck'
import { appOperations } from '../duck'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => {
  const { myBool, petDetails, step } = state.app
  return { myBool, petDetails, step }
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
    }
   }
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent)

export default withRouter(HomeContainer)