
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (blog) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.put(baseUrl + '/' + blog.id, blog, config)
  return response.data
}

const remove = async (id) => {
  const config = { headers: { Authorization: token } }
  await axios.delete(baseUrl + '/' + id, config)
}

const setToken = newToken => token = `bearer ${newToken}`

export default { getAll, create, update, remove, setToken }