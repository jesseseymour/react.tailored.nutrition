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


  
  render() {
    const { selections, petName, handleUpdatePet, handleSelectionUpdate, questions } = this.props 

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
        {questions ? (
          Object.entries(selections).map((selection,questionIndex) =>
            <dd key={questionIndex}>
              <div>{`${questions[questionIndex].question}: `} <span>{`${questions[questionIndex].options[selection[1]]}`}</span></div>
              <ul className='questions' style={{color:'red'}}>
                {questions[questionIndex].options.map(
                  (option, optionIndex) => 
                    <li key={optionIndex} onClick={() => handleSelectionUpdate(questionIndex, optionIndex)}>{option}</li>
                )}
              </ul>
            </dd>)
        ) : null}
      </dl>
    )
  }
}

export default Status