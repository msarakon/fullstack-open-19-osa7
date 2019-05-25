import React from 'react'
import PropTypes from 'prop-types'
import { Header, List } from 'semantic-ui-react'

const User = ({ user }) => {
  if (!user) return null

  return (
    <div>
      <Header as='h2'>{user.name}</Header>
      <Header as='h3'>added blogs</Header>
      <List>
        {
          user.blogs.map(blog =>
            <List.Item key={blog.id}>
              <List.Icon name='newspaper outline' />
              <List.Content>{blog.title}</List.Content>
            </List.Item>
          )
        }
      </List>
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object
}

export default User