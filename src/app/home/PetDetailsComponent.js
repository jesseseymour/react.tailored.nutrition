import React from 'react'

const PetDetails = ({styles, petDetails, handleUpdatePetName, petType = "dog", scrollTo}) => {
  return (
    <div style={styles}>
      <div className="tntool__banner tntool__banner__input">My {petType}'s name is:</div>
      <input className="tntool__input tntool__input--name" maxLength="25" type="text" name="name" required value={petDetails.name} onFocus={() => scrollTo(".tntool__banner--finder", 1000)} onChange={(e) => handleUpdatePetName(e.target.value)} />
    </div>
  )
}


export default PetDetails