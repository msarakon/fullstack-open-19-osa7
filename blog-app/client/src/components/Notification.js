import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = ({ notification }) => {
  if (!notification.message || notification.message.trim() === '') {
    return null
  }
  
  if (notification.style === 'error') {
    return (<Message negative>{notification.message}</Message>)
  }

  return (<Message positive>{notification.message}</Message>)

}

Notification.propTypes = {
  notification: PropTypes.object
}

const mapStateToProps = (state) => {
  return { notification: state.notification }
}

export default connect(mapStateToProps)(Notification)