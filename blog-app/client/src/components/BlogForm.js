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

  const create = (title, author, url) => {
    try {
      props.createBlog({ title, author, url })
      props.setNotification({
        message: `a new blog "${title}" by ${author} added`,
        style: null
      }, 2000)
    } catch (exception) {
      props.setNotification({
        message: 'failed to create a new blog',
        style: 'error'
      }, 2000)
    }
  }

  const submit = (event) => {
    event.preventDefault()
    create(
      title.input.value,
      author.input.value,
      url.input.value
    )
  }

  return (
    <Form onSubmit={submit}>
      <Form.Field>
        <label>title</label>
        <input {...title.input} />
      </Form.Field>
      <Form.Field>
        <label>author</label>
        <input {...author.input} />
      </Form.Field>
      <Form.Field>
        <label>url</label>
        <input {...url.input} />
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