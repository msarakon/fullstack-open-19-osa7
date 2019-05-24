import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import useField from './hooks/index'
import { login, setUser } from './reducers/loginReducer'
import { initBlogs, createBlog, updateBlog, removeBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'

const App = (props) => {
  const init = props.initBlogs

  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      props.setUser(user)
    }
  }, [])

  useEffect(() => {
    init()
  }, [init])

  const showNotification = msg => {
    props.setNotification({ message: msg, style: null }, 2000)
  }

  const showError = msg => {
    props.setNotification({ message: msg, style: 'error' }, 2000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = props.login({
        username: username.input.value,
        password: password.input.value
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      props.setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      showError('wrong username or password')
      setTimeout(() => showError(null), 5000)
    }
  }

  const handleLogOut = () => {
    props.setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const createBlog = async (title, author, url) => {
    try {
      props.createBlog({ title, author, url })
      showNotification(`a new blog "${title}" by ${author} added`)
    } catch (exception) {
      showError('failed to create a new blog')
    }
  }

  const updateBlog = async (blog) => {
    try {
      props.updateBlog(blog)
      showNotification(`"blog ${blog.title}" updated`)
    } catch (exception) {
      showError('failed to update the blog')
    }
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Are you sure you want to remove "${blog.title}" by ${blog.author}?`)) {
      try {
        props.removeBlog(blog.id)
        showNotification(`"blog ${blog.title}" deleted`)
      } catch (exception) {
        showError('failed to remove the blog')
      }
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>username <input {...username.input} /></div>
      <div>password <input {...password.input} /></div>
      <button type="submit">log in</button>
    </form>
  )

  const blogList = () => (
    props.blogs.map(blog =>
      <Blog key={blog.id}
        blog={blog}
        update={(blog) => updateBlog(blog)}
        remove={(blog) => removeBlog(blog)}
        loggedUser={props.loggedUser} />
    )
  )

  return (
    <div>
      <h1>blogs</h1>
      <Notification />
      {
        props.loggedUser === null ? loginForm() :
          <div>
            <p>
              {props.loggedUser.name} logged in <button onClick={handleLogOut}>log out</button>
            </p>
            <Togglable buttonLabel='create a new blog'>
              <BlogForm save={createBlog} />
            </Togglable>
            {blogList()}
          </div>
      }
    </div>
  )
}

const sortedBlogs = ({ blogs }) => {
  return blogs.sort((b1, b2) => b2.likes - b1.likes)
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    blogs: sortedBlogs(state)
  }
}

const mapDispatchToProps = {
  setUser,
  login,
  initBlogs,
  createBlog,
  updateBlog,
  removeBlog,
  setNotification
}

App.propTypes = {
  loggedUser: PropTypes.object,
  setUser: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  initBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array,
  createBlog: PropTypes.func.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)