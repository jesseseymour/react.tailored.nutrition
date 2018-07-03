function hasQuestionBeenAnswered(step,selections){
  return selections.findIndex(selection => selection.step === step) > -1
}

export default hasQuestionBeenAnswered