import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const BlogRow = (props) => {
  const blog = props.blog

  return (
    <Link to={`blogs/${blog.id}`}>{blog.title} ({blog.author})</Link>
  )
}

BlogRow.propTypes = {
  blog: PropTypes.object.isRequired
}

export default BlogRow