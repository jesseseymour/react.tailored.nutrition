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

    const questionIndex = this.props.match.params.id - 2

    return (
      <div>
        {
          this.props.questions && this.props.questions[questionIndex] ? (
            <div>
              {this.props.questions[questionIndex].question}
              {this.props.questions[questionIndex].options.map((option, index) =>
                <button key={index} onClick={() => this.setSelection(index)} disabled={this.state.selection === index}>{option}</button>
              )}
            </div>
          ) : null
        }
        <button onClick={() => this.props.handleSubmit(questionIndex, this.state.selection)}>Update Answer</button>
      </div>
    )
  }
}

export default Question