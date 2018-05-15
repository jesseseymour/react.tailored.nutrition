import { connect } from 'react-redux'
import HomeComponent from './HomeComponent'
import { homeOperations } from './duck'
import { appOperations } from '../duck'

const mapStateToProps = state => {
  const { myBool, petDetails } = state.app
  return { myBool, petDetails }
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
    }
   }
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent)

export default HomeContainer