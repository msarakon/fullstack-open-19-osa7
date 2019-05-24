import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, update, remove, loggedUser }) => {
  const [fullInfo, setFullInfo] = useState(false)

  const showWhenVisible = { display: fullInfo ? '' : 'none' }

  const toggleFullInfo = () => setFullInfo(!fullInfo)

  const like = () =>
    update({...blog, likes: blog.likes + 1 })

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
            loggedUser.username === blog.user.username &&
            <button onClick={() => remove(blog)}>remove</button>
          }
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  loggedUser: PropTypes.object.isRequired
}

export default Blog