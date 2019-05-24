import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  if (!notification.message || notification.message.trim() === '') {
    return null
  }
  
  return (
    <div className={'notification ' + notification.style}>
      {notification.message}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.object
}

const mapStateToProps = (state) => {
  return { notification: state.notification }
}

export default connect(mapStateToProps)(Notification)