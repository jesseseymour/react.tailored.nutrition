import React from 'react'

const PetDetails = ({styles, petDetails, handleUpdatePetName, petType = "dog", scrollTo}) => {
  return (
    <div style={styles}>
      <div className="tntool__banner tntool__banner__input">My {`${petType.charAt(0).toUpperCase() + petType.substr(1).toLowerCase()}'s`} Name is:</div>
      <input className="tntool__input tntool__input--name" maxLength="25" type="text" name="name" required value={petDetails.name} onFocus={() => scrollTo(".tntool__banner--finder", 1000)} onChange={(e) => handleUpdatePetName(e.target.value)} />
    </div>
  )
}


export default PetDetails