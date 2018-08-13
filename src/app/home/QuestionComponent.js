import React, { Component } from 'react'

class Question extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selection: null
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    return nextProps.step !== parseInt(nextProps.match.params.id) ? {selection: null} : null
  }

  

  setSelection(index){
    this.setState({selection:index})
  }

  renderQuestions = () => {
    const questionStep = parseInt(this.props.match.params.id)
    const question = this.props.questions ? this.props.questions.find(question => question.step === questionStep) : null
    const { selections, updateAnswer, petName } = this.props

    function isAnswerActive(option){
      for (let i = 0; i < selections.length; i++){
        if (selections[i].questionId === question.id && selections[i].optionId.indexOf(option.id) > -1) {
          return true
        }
      }
      return false
    }

    return question ? (
      <div>
        <div className='tntool__banner tntool__banner--question' dangerouslySetInnerHTML={{ __html: question.question.replace('${petname}', petName ? petName : 'your pet')}}></div>
        <div className='tntool__options'>
          {question.options.map((option,index) => {
            return (
              <div key={index}
                className={`tntool__option tntool__option--${question.options.length} ${isAnswerActive(option) ? 'active' : 'inactive'}`}
                    onClick={() => 
                      updateAnswer(
                        {
                          exclusiveOptions: question.options.filter(option => option.isExclusive),
                          questionId:question.id, 
                          questionStep:question.step, 
                          optionId:option.id, 
                          multipleChoice:question.multipleChoice,
                          isExclusive: option.isExclusive
                        }
                      )
                    }
              >
                <div className="tntool__optioninner">
                  <span><svg width="100" height="100" className={option.option.trim().replace(/ /g,'-').toLowerCase()} preserveAspectRatio="xMidYMax meet"><use xlinkHref={`#${option.image}${isAnswerActive(option) ? '-active' : ''}`} /></svg></span>
                  <div>{option.option}</div>
                  {option.subtext ? <div className='subtext'>{option.subtext}</div> : null}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    ) : null
  }

  render() {
    //loop through questions and return the question with the right step id
    const { styles } = this.props
    return (
      <div style={styles}>{this.renderQuestions()}</div>
    )
  }
}

export default Question