import React from 'react'

const AnsweredQuestions = ({answers}) => {
  /**
   * Use array.reduce function to create string of answers
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
   */
  const answerStr = answers.reduce((accumulator, currentValue, currentIndex, array) => {
      currentIndex === 0 ? accumulator += '<span>Selected:</span> ' : null
      accumulator += currentValue
      currentIndex < array.length - 1 ? accumulator += ', ' : null
      return accumulator
    }, '')

  return <div className="tntool__answerstring" dangerouslySetInnerHTML={{__html: answerStr}} />
}

export default AnsweredQuestions