import React from 'react'

const PetDetails = ({styles, petDetails, handleUpdatePetDetails}) => {
  return (
    <div style={styles}>
      <input type="text" name="name" required value={petDetails.name} onChange={(e) => handleUpdatePetDetails(e.target.value)} />
    </div>
  )
}


export default PetDetails