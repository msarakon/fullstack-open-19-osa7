import loginService from '../services/login'

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data
  default: return state
  }
}

export const setUser = (data) => {
  return async dispatch => {
    dispatch({ type: 'LOGIN', data })
  }
}
 
export const login = (data) => {
  return async dispatch => {
    const user = await loginService.login({
      username: data.username,
      password: data.password
    })
    dispatch({ type: 'LOGIN', data: user })
  }
}

export default reducer