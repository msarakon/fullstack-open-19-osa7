import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'UPDATE_BLOG':
    return state.map(b =>
      b.id === action.data.id ? action.data : b)
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'REMOVE_BLOG':
    return state.filter(b => b.id !== action.data)
  case 'ADD_COMMENT':
    return state.map(b =>
      b.id === action.data.id ? {
        ...b,
        comments: b.comments.concat(action.data.comment)
      } : b
    )
  case 'INIT_BLOGS':
    return action.data
  default: return state
  }
}

export const updateBlog = (blog) => {
  return async dispatch => {
    const data = await blogService.update(blog)
    dispatch({ type: 'UPDATE_BLOG', data })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const data = await blogService.create(content)
    dispatch({ type: 'NEW_BLOG', data })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({ type: 'REMOVE_BLOG', data: id })
  }
}

export const addComment = (data) => {
  return async dispatch => {
    const comment = await blogService.addComment(data.id, data.comment)
    dispatch({ type: 'ADD_COMMENT', data: {
      id: data.id,
      comment: comment
    }})
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({ type: 'INIT_BLOGS', data })
  }
}

export default reducer