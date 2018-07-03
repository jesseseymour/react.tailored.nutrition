const Status = ({answeredQuestions}) => {
  return (
    answeredQuestions.reduce((accumulator, currentValue, currentIndex, array) => {
      currentIndex === 0 ? accumulator += 'Selected: ' : null
      accumulator += currentValue.answer
      currentIndex < array.length - 1 ? accumulator += ', ' : null
      return accumulator
    }, '')
  )
}

export default Status