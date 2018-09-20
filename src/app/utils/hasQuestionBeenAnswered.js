function hasQuestionBeenAnswered(step,selections){
  let index = selections.findIndex(selection => selection.step === step)
  if (index > -1 && selections[index].optionId.length > 0){
    return true
  }
  return false
}

export default hasQuestionBeenAnswered