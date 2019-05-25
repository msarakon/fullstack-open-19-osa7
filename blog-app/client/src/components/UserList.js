import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const UserList = (props) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {
            props.users.map(user =>
              <tr key={user.id} >
                <td><Link to={`users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { users: state.users }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(UserList)