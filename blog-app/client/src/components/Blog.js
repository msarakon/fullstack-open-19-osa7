import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Divider, Header, Input, Icon, List } from 'semantic-ui-react'
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
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
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
      <Header as='h2'>{blog.title} {blog.author}</Header>
      <p>
        blog has {blog.likes} like(s) <Button id='like-button' compact icon onClick={like}>
          <Icon name='like' />
          like
        </Button>
      </p>
      <p>added by {blog.user ? blog.user.name : '?'}</p>
      <Divider />
      <Header as='h3'>comments</Header>
      <Input id='new-comment' {...comment.input} action={
        <Button id='save-comment' primary onClick={addComment}>add comment</Button>
      } />
      <List>
        {
          blog.comments.map(comment =>
            <List.Item key={comment.id}>
              <List.Icon name='comment outline' />
              <List.Content>{comment.comment}</List.Content>
            </List.Item>
          )
        }
      </List>
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