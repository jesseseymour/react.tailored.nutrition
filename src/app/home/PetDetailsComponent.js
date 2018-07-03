import React from 'react'

const PetDetails = ({styles, petDetails, handleUpdatePetName}) => {
  return (
    <div style={styles}>
      <input type="text" name="name" required value={petDetails.name} onChange={(e) => handleUpdatePetName(e.target.value)} />
    </div>
  )
}


export default PetDetails