import React from 'react'

const ProgressBar = ({ step, totalSteps, render }) => {
  const left = (step - 1) / totalSteps * 100 + "%"
  const barStyle = {
    height: '1px',
    width: '75%',
    maxWidth: '500px',
    backgroundColor: '#bababa',
    position: 'relative',
    margin: '40px auto'
  }
  const headStyle = {
    height: '30px',
    width: '30px',
    backgroundColor: 'white',
    position: 'absolute',
    transform: 'translate(-50%,-50%)',
    left: left,
    textAlign: 'center',
    color: 'white',
    top: '-2px'
  }
  const stepStyle = {
    position: 'absolute',
    left: '0px',
    top: '11px',
    fontSize: '14px',
    textAlign: 'center',
    width: '18px'
  }
  const bowlStyle = {
    position: 'absolute',
    top: '-20px',
    right: '-40px'
  }
  return (
    render ? 
    <div style={barStyle} className="progressbar">
      <div style={headStyle} className="progressbar__head">
        <svg width="30" height="30" preserveAspectRatio="xMidYMax meet"><use xlinkHref="#paw"></use></svg>
        <div style={stepStyle}>{step}</div>
      </div>
      <div style={bowlStyle} className="tntool__bowl tntool__bowl--nolines tntool__bowl--grey"><svg width="50" height="30" preserveAspectRatio="xMidYMax meet"><use xlinkHref="#dog-food-bowl"></use></svg></div>
    </div > : null
  )
}

export default ProgressBar