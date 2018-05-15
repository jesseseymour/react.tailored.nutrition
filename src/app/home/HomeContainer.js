import { connect } from 'react-redux'
import HomeComponent from './HomeComponent'
import { homeOperations } from './duck'

const mapStateToProps = state => {
  const { myBool, petDetails } = state.home
  return { myBool, petDetails }
  //return state.home
}

const mapDispatchToProps = dispatch => {
  return { 
    toggleMyBool(bool) {
      dispatch(
        homeOperations.toggleMyBool()
      )
    },
    updatePetDetails(payload) {
      dispatch(
        homeOperations.updatePetDetails(payload)
      )
    }
   }
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent)

export default HomeContainer