import React from 'react'
import PropTypes from 'prop-types'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className="blog-title">
      {blog.title} {blog.author}
    </div>
    <div>
      <span className="blog-likes">blog has {blog.likes} likes</span>
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

SimpleBlog.propTypes = {
  blog: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}  

export default SimpleBlog