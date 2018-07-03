import React from 'react'

const StepSelector = ({next, prev, nextStep, prevStep, isReadyToAdvance, results, getResults}) => {
  const prevButton = prev ? <button onClick={prevStep}>Back</button> : null
  const nextButton = next ? <button disabled={!isReadyToAdvance} onClick={nextStep}>Next</button> : null
  const resultsButton = results ? <button onClick={getResults}>Get Results</button> : null
  return (
    <div>
      {prevButton}
      {nextButton}
      {resultsButton}
    </div>
  )
}

export default StepSelector