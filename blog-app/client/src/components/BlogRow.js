import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const BlogRow = (props) => {
  const blog = props.blog

  return (
    <div className="blog-row">
      <div className="blog-title">
        <Link to={`blogs/${blog.id}`}>
          {blog.title} ({blog.author})
        </Link>
      </div>
    </div>
  )
}

BlogRow.propTypes = {
  blog: PropTypes.object.isRequired
}

export default BlogRow