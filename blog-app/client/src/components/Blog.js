import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = (props) => {
  const blog = props.blog
  if (!blog) return null

  const update = async (blog) => {
    try {
      await props.updateBlog(blog)
      props.setNotification({
        message: `blog "${blog.title}" updated`,
        style: null
      }, 2000)
    } catch (exception) {
      props.setNotification({
        message: 'failed to update the blog',
        style: 'error'
      }, 2000)
    }
  }

  const like = () =>
    update({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id : null
    })

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <p>
        blog has {blog.likes} likes <button onClick={like}>like</button>
      </p>
      {
        blog.user && <p>added by {blog.user.name}</p>
      }
    </div>
  )
}

const mapDispatchToProps = {
  updateBlog,
  removeBlog,
  setNotification
}

Blog.propTypes = {
  blog: PropTypes.object,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(Blog)