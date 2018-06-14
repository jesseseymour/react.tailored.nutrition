import React from 'react'

const StepSelector = ({next, prev, nextStep, prevStep, isReadyToAdvance}) => {
  const prevButton = prev ? <button onClick={prevStep}>Previous Step</button> : null
  const nextButton = next ? <button disabled={!isReadyToAdvance} onClick={nextStep}>Next Step</button> : null
  return (
    <div>
      {prevButton}
      {nextButton}
    </div>
  )
}

export default StepSelector