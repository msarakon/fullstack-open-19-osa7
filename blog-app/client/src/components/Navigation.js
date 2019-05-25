import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'

const Navigation = (props) => {

  const handleLogOut = () => props.logout()

  return (
    <div className="navigation">
      <Link to='/'>blogs</Link>
      <Link to='/users'>users</Link>
      {
        props.loggedUser &&
        <span>
          {props.loggedUser.name} logged in <button onClick={handleLogOut}>log out</button>
        </span>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser
  }
}

const mapDispatchToProps = { logout }

Navigation.propTypes = {
  loggedUser: PropTypes.object,
  logout: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)