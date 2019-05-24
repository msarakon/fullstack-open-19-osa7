const initialState = { message: '', style: '' }

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return {
      ...state,
      message: action.data.message,
      style: action.data.style
    }
  default: return state
  }
}

export const setNotification = (data, timeout) => {
  return dispatch => {
    dispatch({ type: 'SET_NOTIFICATION', data })
    setTimeout(() => dispatch({
      type: 'SET_NOTIFICATION',
      data: initialState
    }), timeout)
  }
}

export default reducer