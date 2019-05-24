const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'HTML on helppoa',
    author: 'Matti Luukkainen',
    likes: 5,
    url: 'www.google.fi',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  },
  {
    id: '5a451e21e0b8b04a45638211',
    title: 'Selain pystyy suorittamaan vain javascriptiä',
    author: 'Matti Luukkainen',
    likes: 3,
    url: 'www.google.fi',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  },
  {
    id: '5a451e30b5ffd44a58fa79ab',
    content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
    author: 'Matti Luukkainen',
    likes: 15,
    url: 'www.google.fi',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  }
]
  
const getAll = () => new Promise(resolve => setTimeout(resolve)).then(() => blogs)
const setToken = () => {}
  
export default { getAll, setToken }