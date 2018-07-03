import React, { Component } from 'react'

class Status extends Component {
  constructor(props) {
   super(props)
   this.state = {
     editPetName: false
   }
  }
  
  componentDidUpdate = () => {
    this.state.editPetName ? document.getElementById('PetNameInput').focus() : null
  }

  getAnsweredQuestions = () => {
    const { selections, questions } = this.props
    let arr = []
    if (selections.length > 0) {
      selections.map((selection, index) => {
        const question = questions.find(question => question.id === selection.questionId)
        const answer = question.options.find(option => option.id === selection.optionId)
        arr.push({question: question, answer: answer.option})
      })
    }
    return arr
  }

  
  render() {
    const { selections, petName, handleUpdatePetName, handleSelectionUpdate, questions, step } = this.props 

    const answeredQuestions = questions ? this.getAnsweredQuestions() : []

    return (
      <dl>
        <dt>Your Selections:</dt>
        <dd>Pet Name: 
          <input 
            id="PetNameInput"
            type="text" 
            name="name"
            style={this.state.editPetName ? {display:'inline'} : {display:'none'}}
            autoFocus
            required
            value={petName}
            onChange={e => handleUpdatePetName(e.target.value)}
            onBlur={() => this.setState({ editPetName: false })}
            onFocus={e => e.target.select()} />
          <span 
            style={!this.state.editPetName ? { display: 'inline' } : { display: 'none' }}
            onClick={() => this.setState({editPetName:true})}>{petName}</span>
        </dd>
        {
          answeredQuestions.map((entry,i) => {
            return (
              <dd key={i}>
                {entry.question.question.replace('${petname}', this.props.petName ? this.props.petName : 'your pet')} {entry.answer}
                <ul>
                  {
                    entry.question.options.map((option, i) => {
                      return (
                        <li key={i}
                            onClick={() => handleSelectionUpdate({questionId:entry.question.id, questionStep:entry.question.step, optionId:option.id})}>
                          {option.option}
                        </li>
                      )
                    })
                  }
                </ul>
              </dd>
            )
          })
        }
      </dl>
    )
  }
}

export default Status