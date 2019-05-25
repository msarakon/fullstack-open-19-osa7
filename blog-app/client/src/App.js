import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container, Divider, Header, Icon, Button, Segment, Form } from 'semantic-ui-react'
import Navigation from './components/Navigation'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import User from './components/User'
import useField from './hooks/index'
import { login, fetchUser } from './reducers/loginReducer'
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

  const loginForm = () => (
    <Segment>
      <Form onSubmit={handleLogin}>
        <Form.Field>
          <label>username</label>
          <input {...username.input} />
        </Form.Field>
        <Form.Field>
          <label>password</label>
          <input {...password.input} />
        </Form.Field>
        <Button primary type="submit">log in</Button>
      </Form>
    </Segment>
  )

  const blogById = (id) =>
    props.blogs.find(blog => blog.id === id)

  const userById = (id) =>
    props.users.find(user => user.id === id)

  return (
    <Container>
      {
        props.loggedUser === null ? loginForm() :
          <Router>
            <Navigation />
            <Header as='h1'>
              <Icon name='newspaper outline'/>
              <Header.Content>blog app</Header.Content>
            </Header>
            <Notification />
            <Divider />
            <Route exact path='/' render={() =>
              <div>
                <Segment>
                  <Togglable buttonLabel='create a new blog'>
                    <BlogForm />
                  </Togglable>
                </Segment>
                <BlogList />
              </div>
            } />
            <Route exact path='/users' render={() => <UserList /> } />
            <Route path='/users/:id' render={({ match }) => 
              <User user={userById(match.params.id)} />
            } />
            <Route path='/blogs/:id' render={({ match }) => 
              <Blog blog={blogById(match.params.id)} />
            } />
          </Router>
      }
    </Container>
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
  initBlogs,
  initUsers,
  setNotification
}

App.propTypes = {
  loggedUser: PropTypes.object,
  fetchUser: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  initBlogs: PropTypes.func.isRequired,
  initUsers: PropTypes.func.isRequired,
  blogs: PropTypes.array,
  users: PropTypes.array,
  setNotification: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)