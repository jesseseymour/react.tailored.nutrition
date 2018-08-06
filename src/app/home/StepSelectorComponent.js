import React from 'react'

const StepSelector = ({next, prev, nextStep, prevStep, isReadyToAdvance, results, getResults}) => {
  const prevButton = prev ? <button onClick={prevStep} className="tntool__button tntool__button--back">Back</button> : null
  const nextButton = next ? <button disabled={!isReadyToAdvance} onClick={nextStep} className="tntool__button tntool__button--next">Next</button> : null
  const resultsButton = results ? <button onClick={getResults} className="tntool__button tntool__button--submit">Get Results</button> : null
  return (
    <div className="tntool__stepSelector">
      {prevButton}
      {prev && ( next || results) ? <span className="seperator"></span> : null}
      {nextButton}
      {resultsButton}
    </div>
  )
}

export default StepSelector