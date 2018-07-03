import React from 'react'

const PetDetails = ({styles, petDetails, handleUpdatePetName, petType = "dog"}) => {
  return (
    <div style={styles}>
      My {`${petType}'s`} name is: <input type="text" name="name" required value={petDetails.name} onChange={(e) => handleUpdatePetName(e.target.value)} />
    </div>
  )
}


export default PetDetails