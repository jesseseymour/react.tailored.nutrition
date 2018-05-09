import Switch from '../ui/Switch'
import { switchBool } from '../../actions/items'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    defaultActions: state.defaultActions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    switchBool(bool) {
      dispatch(
        switchBool(bool)
      )
    }
  }
}

const SwitchContainer = connect(
  //mapStateToProps, 
  mapDispatchToProps
)(Switch)

export default SwitchContainer