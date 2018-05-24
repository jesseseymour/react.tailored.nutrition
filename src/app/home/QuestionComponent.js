import React, { Component } from 'react'

class Question extends Component {
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

    const questionIndex = this.props.match.params.id - 2

    return (
      <div>
        {
          this.props.questions && this.props.questions[questionIndex] ? (
            <div>
              {this.props.questions[questionIndex].question}
              {this.props.questions[questionIndex].options.map((option, index) =>
                <button key={index} onClick={() => this.setSelection(option)} disabled={this.state.selection === 1}>{option}</button>
              )}
            </div>
          ) : null
        }
        <button disabled={!this.state.selection} onClick={() => this.props.handleSubmit(this.state.selection)}>Update Answer</button>
      </div>
    )
  }
}

export default Question