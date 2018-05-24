import React from 'react'

const Status = ({ props }) => {
  const selections = Object.entries(props.selections)
  return (
    <dl>
      <dt>Your Selections:</dt>
      <dd>Pet Name: {props.petDetails.name}</dd>
      {selections.map(selection =>
        <dd key={selection[0]}>{`${selection[0]}: ${selection[1]}`}</dd>
      )}
    </dl>
  )
}

export default Status