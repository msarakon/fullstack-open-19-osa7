import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Form } from 'semantic-ui-react'
import useField from '../hooks/index'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const create = (blog) => {
    try {
      props.createBlog(blog)
      props.setNotification({
        message: `a new blog "${blog.title}" by ${blog.author} added`,
        style: null
      }, 2000)
      title.reset()
      author.reset()
      url.reset()
    } catch (exception) {
      props.setNotification({
        message: 'failed to create a new blog',
        style: 'error'
      }, 2000)
    }
  }

  const submit = (event) => {
    event.preventDefault()
    create({
      title: title.input.value,
      author: author.input.value,
      url: url.input.value
    })
  }

  return (
    <Form onSubmit={submit}>
      <Form.Field>
        <label>title</label>
        <input id='new-blog-title' {...title.input} />
      </Form.Field>
      <Form.Field>
        <label>author</label>
        <input id='new-blog-author' {...author.input} />
      </Form.Field>
      <Form.Field>
        <label>url</label>
        <input id='new-blog-url' {...url.input} />
      </Form.Field>
      <Button primary type="submit">save</Button>
    </Form>
  )
}

const mapDispatchToProps = {
  createBlog,
  setNotification
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(BlogForm)