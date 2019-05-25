import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Header, Table } from 'semantic-ui-react'

const UserList = (props) => {
  return (
    <div>
      <Header as='h2'>Users</Header>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>blogs created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            props.users.map(user =>
              <Table.Row key={user.id} >
                <Table.Cell><Link to={`users/${user.id}`}>{user.name}</Link></Table.Cell>
                <Table.Cell>{user.blogs.length}</Table.Cell>
              </Table.Row>
            )
          }
        </Table.Body>
      </Table>
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