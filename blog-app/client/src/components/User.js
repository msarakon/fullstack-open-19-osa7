import React from 'react'
import PropTypes from 'prop-types'

const User = ({ user }) => {
  return (
    <div>{user.name}</div>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired
}

export default User