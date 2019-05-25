import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { List } from 'semantic-ui-react'
import BlogRow from './BlogRow'

const BlogList = ({ blogs }) => {
  return (
    <List divided verticalAlign='middle' size='large'>
      {
        blogs.map(blog => 
          <List.Item key={blog.id}>
            <List.Content>
              <List.Header>
                <BlogRow blog={blog} />
              </List.Header>
            </List.Content>
          </List.Item>
        )
      }
    </List>
  )
}

const mapStateToProps = (state) => {
  return { blogs: state.blogs }
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(BlogList)