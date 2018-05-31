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

  getAnsweredQuestions = (questions, selections) => {
    let arr = []
    Object.entries(selections).map((selection, index) => {
      const question = questions.find(question => question.id === parseInt(selection[0]))
      const answer = question.options.find(option => option.id === selection[1])
      arr.push({question: question.question, answer: answer.option})
    })
    console.log(arr)
  }

  
  render() {
    const { selections, petName, handleUpdatePet, handleSelectionUpdate, questions, step } = this.props 

    const answeredQuestions = questions ? this.getAnsweredQuestions(questions, selections) : null

    // const answeredQuestions = questions ? Object.entries(selections).map((selection, index) => {
    //   questions.find(question => question.id === parseInt(selection[0]))
    // }) : null

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
        {answeredQuestions}
        {/* {questions ? (
          Object.entries(selections).map((selection, index) =>
            <dd key={index}>
              <div>{`${questions[selection[0]].question}: `} <span>{`${questions[selection[0]].options[selection[1].option]}`}</span></div>
              <ul className='questions' style={{color:'red'}}>
                {questions[selection[0]].options.map(
                  (option, optionIndex) => 
                    <li key={optionIndex} onClick={() => handleSelectionUpdate(questions[selection[0]].id, option.id)}>{option.option}</li>
                )}
              </ul>
            </dd>)
        ) : null} */}
      </dl>
    )
  }
}

export default Status