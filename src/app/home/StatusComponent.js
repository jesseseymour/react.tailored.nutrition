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
    Object.entries(selections).map((selection, index) => {
      const question = questions.find(question => question.id === parseInt(selection[0]))
      const answer = question.options.find(option => option.id === selection[1])
      arr.push({question: question, answer: answer.option})
    })
    return arr
  }

  
  render() {
    const { selections, petName, handleUpdatePet, handleSelectionUpdate, questions, step } = this.props 

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
            onChange={e => handleUpdatePet(e.target.value)}
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
                {entry.question.question} {entry.answer}
                <ul>
                  {
                    entry.question.options.map((option, i) => {
                      return (
                        <li key={i}
                            onClick={() => handleSelectionUpdate(entry.question.id, option.id)}>
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