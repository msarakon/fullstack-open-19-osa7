import loginService from '../services/login'
import blogService from '../services/blogs'

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    if (action.data) blogService.setToken(action.data.token)
    return action.data
  default: return state
  }
}

export const fetchUser = () => {
  return dispatch => {
    const userStr = window.localStorage.getItem('loggedBlogAppUser')
    const user = JSON.parse(userStr)
    if (user) {
      dispatch({ type: 'SET_USER', data: user })
    }
  }
}

export const setUser = (data) => {
  return dispatch => {
    dispatch({ type: 'SET_USER', data })
  }
}
 
export const login = (data) => {
  return async dispatch => {
    const user = await loginService.login({
      username: data.username,
      password: data.password
    })
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    dispatch({ type: 'SET_USER', data: user })
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch({ type: 'SET_USER', data: null })
  }
}

export default reducer