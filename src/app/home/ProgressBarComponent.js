import React from 'react'

const ProgressBar = ({step, totalSteps, render}) => {
  const left = (step-1)/totalSteps * 100 + "%"
  const barStyle = {
    height: '1px',
    width: '200px',
    backgroundColor: 'grey',
    position: 'relative',
    margin: '40px 10px'
  }
  const headStyle = {
    height: '20px',
    width: '20px',
    backgroundColor: 'green',
    position: 'absolute',
    transform: 'translate(-50%,-50%)',
    left: left,
    textAlign: 'center',
    color: 'white'
  }
  return (
    render ? <div style={barStyle} className="progressbar">
      <div style={headStyle} className="progressbar__head">{step}</div>
    </div> : null
  )
}

export default ProgressBar