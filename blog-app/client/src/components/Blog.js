import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import useField from '../hooks/index'
import { updateBlog, removeBlog, addComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = (props) => {
  const comment = useField('text')

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

  const addComment = async () => {
    try {
      await props.addComment({
        id: blog.id,
        comment: comment.input.value
      })
      comment.reset()
      props.setNotification({
        message: 'new comment added',
        style: null
      }, 2000)
    } catch (exception) {
      props.setNotification({
        message: 'failed to add a new comment',
        style: 'error'
      }, 2000)
    }
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <p>
        blog has {blog.likes} likes <button onClick={like}>like</button>
      </p>
      {
        blog.user && <p>added by {blog.user.name}</p>
      }
      <h3>comments</h3>
      <p>
        <input {...comment.input} /> <button onClick={addComment}>add comment</button>
      </p>
      <ul>
        {
          blog.comments.map(comment => <li key={comment.id}>{comment.comment}</li>)
        }
      </ul>
    </div>
  )
}

const mapDispatchToProps = {
  updateBlog,
  removeBlog,
  addComment,
  setNotification
}

Blog.propTypes = {
  blog: PropTypes.object,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(Blog)