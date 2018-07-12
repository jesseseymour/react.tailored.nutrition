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
    const { selections } = this.props
    return (
      <div style={this.props.styles}>
        {
          question ? (
            <div>
              {question.question.replace('${petname}', this.props.petName ? this.props.petName : 'your pet')}
              {question.options.map((option, index) =>
                <div style={{display: 'inline-block', cursor: 'pointer'}} key={index} onClick={() => this.props.handleSubmit({questionId:question.id, questionStep:question.step, optionId:option.id})}>
                  {selections.findIndex(selection => selection.optionId === option.id) > -1 ? (
                    <span className="active"><svg width="100" height="100" preserveAspectRatio="xMidYMax meet"><use xlinkHref={`#${option.image}-active`} /></svg></span>
                  ):(
                    <span className="inactive"><svg width="100" height="100" preserveAspectRatio="xMidYMax meet"><use xlinkHref={`#${option.image}`} /></svg></span>
                  )}
                  
                  
                  <div>{option.option}</div>
                </div>
              )}
            </div>
          ) : null
        }
      </div>
    )
  }
}

export default Question