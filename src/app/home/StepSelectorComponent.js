import React from 'react'

const StepSelector = ({step, nextStep, prevStep, isReadyToAdvance}) => {
   
  return (
    <div>
      <button onClick={prevStep}>Previous Step</button>
      <button disabled={!isReadyToAdvance} onClick={nextStep}>Next Step</button>
    </div>
  )
}

export default StepSelector