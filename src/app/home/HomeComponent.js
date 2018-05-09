import React, { Component } from 'react'

class HomeComponent extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return <button onClick={() => this.props.toggleMyBool()}>This is my button</button>
  }
}

export default HomeComponent