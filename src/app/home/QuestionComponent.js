import React, { Component } from 'react'

class Question extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selection: null
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    return nextProps.step !== parseInt(nextProps.match.params.id) ? {selection: null} : null
  }

 

  setSelection(index){
    this.setState({selection:index})
  }

  render() {
    //loop through questions and return the question with the right step id
    const questionStep = parseInt(this.props.match.params.id)
    const question = this.props.questions ? this.props.questions.find(question => question.step === questionStep) : null
    return (
      <div style={this.props.styles}>
        {
          question ? (
            <div>
              {question.question}
              {question.options.map((option, index) =>
                <button key={index} onClick={() => this.setSelection(option.id)} disabled={this.state.selection === option.id}>{option.option}</button>
              )}
            </div>
          ) : null
        }
        <button onClick={() => this.props.handleSubmit(question.id, this.state.selection, true)}>Update Answer</button>
      </div>
    )
  }
}

export default Question