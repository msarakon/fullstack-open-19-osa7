import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, style }) => {
  if (!message || message.trim() === '') {
    return null
  }
  
  return (
    <div className={'notification ' + style}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  style: PropTypes.string
}

export default Notification