import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs'
import useField from './hooks/index'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ msg: '', style: null })

  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const showNotification = msg => {
    setNotification({ msg: msg, style: null })
    setTimeout(() => setNotification({ msg: '', style: null }), 2000)
  }

  const showError = msg => {
    setNotification({ msg: msg, style: 'error' })
    setTimeout(() => setNotification({ msg: '', style: null }), 2000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.input.value,
        password: password.input.value
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      showError('wrong username or password')
      setTimeout(() => showError(null), 5000)
    }
  }

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const createBlog = async (title, author, url) => {
    try {
      const blog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(blog))
      showNotification(`a new blog "${blog.title}" by ${blog.author} added`)
    } catch (exception) {
      showError('failed to create a new blog')
    }
  }

  const updateBlog = async (blog) => {
    try {
      const updated = await blogService.update(blog)
      setBlogs(blogs.map(b => b.id === updated.id ? updated : b))
      showNotification(`"blog ${blog.title}" updated`)
    } catch (exception) {
      showError('failed to update the blog')
    }
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Are you sure you want to remove "${blog.title}" by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
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
    blogs.sort((b1, b2) => b2.likes - b1.likes).map(blog =>
      <Blog key={blog.id}
        blog={blog}
        update={(blog) => updateBlog(blog)}
        remove={(blog) => removeBlog(blog)}
        loggedUser={user} />
    )
  )

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={notification.msg} style={notification.style} />
      {
        user === null ? loginForm() :
          <div>
            <p>
              {user.name} logged in <button onClick={handleLogOut}>log out</button>
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

export default App