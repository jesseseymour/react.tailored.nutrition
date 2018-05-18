import React, { Component } from 'react'

class Step2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selection: null
    }
  }

  setSelection(index){
    this.setState({selection:index})
  }

  render() {
    return (
      <form onSubmit={() => this.props.handleSubmit(this.state.selection)}>
        <button onClick={() => this.setSelection(1)} disabled={this.state.selection === 1}>Answer 1</button>
        <button onClick={() => this.setSelection(2)} disabled={this.state.selection === 2}>Answer 2</button><br/>
        <input type="submit" value="Next Question" disabled={!this.state.selection} />
      </form>
    )
  }
}

export default Step2