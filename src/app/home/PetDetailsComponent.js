import React from 'react'

const PetDetails = ({styles, petDetails, handleUpdatePetName, petType = "dog"}) => {
  return (
    <div style={styles}>
      <div className="tntool__banner tntool__banner__input">My {`${petType}'s`} name is:</div>
      <input className="tntool__input tntool__input--name" type="text" name="name" required value={petDetails.name} onChange={(e) => handleUpdatePetName(e.target.value)} />
    </div>
  )
}


export default PetDetails