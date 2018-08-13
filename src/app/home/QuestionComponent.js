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


    /**
     * Create new array using array.filter.
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
     * If questionId === question.id and if selection option id is found in list of options, push to array.
     * If array length is greater than 0, return true
     */
    function isAnswerActive(option){
      return selections.filter(selection => selection.questionId === question.id && selection.optionId.indexOf(option.id) > -1).length > 0
    }


    /**
     * array.map options and render.
     * Use isAnswerActive function to determine whether or not answer is active.
     * onClick, use updateAnswer function passed through props from HomeComponent
     */
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