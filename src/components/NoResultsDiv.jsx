import React from 'react'

const NoResultsDiv = () => {
  return (
    <div className='no-results'>
      <h3 className="title">Something went wrong</h3>
      <p className="message">Unable to retrieve message. Ensure that you entered a valid city and try again</p>

    </div>
  )
}

export default NoResultsDiv
