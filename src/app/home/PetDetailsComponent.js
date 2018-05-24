import React, { Component } from 'react'

class PetDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.petDetails.name
    }
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value })
  }

  render() {
    return (
      <div>
        <input type="text" name="name" required value={this.state.name} onChange={(e) => this.handleChange(e)} />
        <button onClick={() => this.props.handleSubmit(this.state.name)}>Update Pet Name</button>
      </div>
    )
  }
}

export default PetDetails