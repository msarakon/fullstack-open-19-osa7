import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

const blog = {
  title: 'Title',
  author: 'Author',
  likes: 3,
  url: 'www.google.fi'
}

test('should render blog title, author and likes', () => {
  const component = render(
    <SimpleBlog blog={blog} onClick={() => {}} />
  )

  expect(component.container.querySelector('.blog-title')).toHaveTextContent(
    'Title Author'
  )

  expect(component.container.querySelector('.blog-likes')).toHaveTextContent(
    'blog has 3 likes'
  )
})

test('should call event handler each time the like button is clicked', () => {
  const eventHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={eventHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(eventHandler.mock.calls.length).toBe(2)
})