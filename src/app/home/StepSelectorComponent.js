import React from 'react'

const StepSelector = ({step, nextStep, prevStep}) => {
   
  return (
    <div>
      <button onClick={prevStep}>Previous Step</button>
      <button onClick={nextStep}>Next Step</button>
    </div>
  )
}

export default StepSelector