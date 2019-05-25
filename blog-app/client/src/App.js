import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import User from './components/User'
import useField from './hooks/index'
import { login, logout, fetchUser } from './reducers/loginReducer'
import { initBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { initUsers } from './reducers/userReducer'

const App = (props) => {
  const fetchBlogs = props.initBlogs
  const fetchUsers = props.initUsers
  const fetchUser = props.fetchUser

  const username = useField('text')
  const password = useField('password')

  useEffect(() => { fetchUser() }, [fetchUser])
  useEffect(() => { fetchBlogs() }, [fetchBlogs])
  useEffect(() => { fetchUsers() }, [fetchUsers])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await props.login({
        username: username.input.value,
        password: password.input.value
      })
      username.reset()
      password.reset()
    } catch (exception) {
      props.setNotification({
        message: 'wrong username or password',
        style: 'error'
      }, 5000)
    }
  }

  const handleLogOut = () => props.logout()

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>username <input {...username.input} /></div>
      <div>password <input {...password.input} /></div>
      <button type="submit">log in</button>
    </form>
  )

  const blogList = () =>
    props.blogs.map(blog => <Blog key={blog.id} blog={blog} />)

  const userById = (id) =>
    props.users.find(user => user.id === id)

  return (
    <div>
      <h1>blogs</h1>
      <Notification />
      <Router>
        {
          props.loggedUser === null ? loginForm() :
            <div>
              <p>
                {props.loggedUser.name} logged in <button onClick={handleLogOut}>log out</button>
              </p>
              <Route exact path='/' render={() =>
                <div>
                  <Togglable buttonLabel='create a new blog'>
                    <BlogForm />
                  </Togglable>
                  {blogList()}
                </div>
              } />
            </div>
        }
        <Route exact path='/users' render={() => <UserList /> } />
        <Route path='/users/:id' render={({ match }) => 
          <User user={userById(match.params.id)} />
        } />
      </Router>
    </div>
  )
}

const sortedBlogs = ({ blogs }) => {
  return blogs.sort((b1, b2) => b2.likes - b1.likes)
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    blogs: sortedBlogs(state),
    users: state.users
  }
}

const mapDispatchToProps = {
  fetchUser,
  login,
  logout,
  initBlogs,
  initUsers,
  setNotification
}

App.propTypes = {
  loggedUser: PropTypes.object,
  fetchUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  initBlogs: PropTypes.func.isRequired,
  initUsers: PropTypes.func.isRequired,
  blogs: PropTypes.array,
  users: PropTypes.array,
  setNotification: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)