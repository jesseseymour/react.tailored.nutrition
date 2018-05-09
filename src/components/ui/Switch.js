import { Component } from 'react'

class Switch extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    return <button onClick={this.props.switchBool}>Switch State</button>
  }
}

export default Switch