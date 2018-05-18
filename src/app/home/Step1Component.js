import React, { Component } from 'react'

class Step1 extends Component {
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
      <form onSubmit={() => this.props.handleSubmit(this.state.name)}>
        <input type="text" name="name" required value={this.state.name} onChange={(e) => this.handleChange(e)} />
        <input type="submit" value="Continue" />
      </form>
    )
  }
}

export default Step1