import React from 'react'

const Status = ({ selections, petName, handleUpdatePet }) => {
  return (
    <dl>
      <dt>Your Selections:</dt>
      <dd>Pet Name: 
        <input 
          type="text" 
          name="name" 
          required 
          defaultValue={petName}
          onChange={e => handleUpdatePet(e.target.value)} />
      </dd>
      {Object.entries(selections).map(selection =>
        <dd key={selection[0]}>{`${selection[0]}: ${selection[1]}`}</dd>
      )}
    </dl>
  )
}

export default Status