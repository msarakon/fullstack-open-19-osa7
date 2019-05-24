const listHelper = require('../utils/list_helper')
const mockData = require('./mock_data')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

test('dummy should return one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('should return likes of the single blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('should return total likes for a list of multiple blogs', () => {
    const result = listHelper.totalLikes(mockData.blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {

  test('should return the single blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('should return the blog with most likes', () => {
    const result = listHelper.favoriteBlog(mockData.blogs)
    expect(result.title).toBe('Canonical string reduction')
  })
})

describe('most blogs', () => {

  test('should return author for the single blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      author: listWithOneBlog[0].author,
      blogs: 1
    })
  })

  test('should return the author with most blogs', () => {
    const result = listHelper.mostBlogs(mockData.blogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('most likes', () => {

  test('should return author for the single blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes
    })
  })

  test('should return the author with most likes', () => {
    const result = listHelper.mostLikes(mockData.blogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})