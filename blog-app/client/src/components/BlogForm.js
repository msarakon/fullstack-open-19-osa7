import React from 'react'
import PropTypes from 'prop-types'
import useField from '../hooks/index'

const BlogForm = ({ save }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const submit = (event) => {
    event.preventDefault()
    save(
      title.input.value,
      author.input.value,
      url.input.value
    )
  }

  return (
    <form onSubmit={submit}>
      <div>
        title: <input {...title.input} />
      </div>
      <div>
        author: <input {...author.input} />
      </div>
      <div>
        url: <input {...url.input} />
      </div>
      <button type="submit">save</button>
    </form>
  )
}

BlogForm.propTypes = {
  save: PropTypes.func.isRequired
}

export default BlogForm