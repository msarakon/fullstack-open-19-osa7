import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = (props) => {
  const [fullInfo, setFullInfo] = useState(false)
  const blog = props.blog

  const showWhenVisible = { display: fullInfo ? '' : 'none' }

  const toggleFullInfo = () => setFullInfo(!fullInfo)

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

  const remove = async (blog) => {
    if (window.confirm(`Are you sure you want to remove "${blog.title}" by ${blog.author}?`)) {
      try {
        await props.removeBlog(blog.id)
        props.setNotification({
          message: `blog "${blog.title}" deleted`,
          style: null
        }, 2000)
      } catch (exception) {
        props.setNotification({
          message: 'failed to remove the blog',
          style: 'error'
        }, 2000)
      }
    }
  }

  const like = () =>
    update({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id : null
    })

  return (
    <div className="blog-row" onClick={toggleFullInfo}>
      <div className="blog-title">{blog.title} ({blog.author})</div>
      <div className="blog-full-info" style={showWhenVisible}>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>
          {blog.likes} likes <button onClick={like}>like</button>
        </div>
        <div>
          {
            blog.user && <div>added by {blog.user.name}</div> &&
            props.loggedUser.username === blog.user.username &&
            <button onClick={() => remove(blog)}>remove</button>
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser
  }
}

const mapDispatchToProps = {
  updateBlog,
  removeBlog,
  setNotification
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  loggedUser: PropTypes.object,
  setNotification: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)