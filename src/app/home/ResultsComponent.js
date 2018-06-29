import React from 'react'

const Results = ({styles, results}) => {
  return (
    <div style={styles}>
      {results ? JSON.stringify(results) : null}
    </div>
  )
}


export default Results