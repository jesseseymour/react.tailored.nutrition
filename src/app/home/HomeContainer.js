import { connect } from 'react-redux'
import HomeComponent from './HomeComponent'
import { homeOperations } from './duck'

const mapStateToProps = state => {
  const { myBool } = state.home
  return { myBool }
}

const mapDispatchToProps = dispatch => {
  return { 
    toggleMyBool(bool) {
      dispatch(
        homeOperations.toggleMyBool()
      )
    }
   }
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent)

export default HomeContainer