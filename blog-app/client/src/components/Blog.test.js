import React from 'react'
import { Provider } from 'react-redux'
import { render, fireEvent, cleanup } from 'react-testing-library'
import store from '../store'
import Blog from './Blog'

afterEach(cleanup)

describe('Blog', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'Title',
      author: 'Author',
      likes: 3,
      url: 'www.google.fi'
    }
 
    component = render(
      <Provider store={store}><Blog blog={blog} /></Provider>
    )
  })

  it('should display blog title and author', () => {
    const title = component.container.querySelector('.blog-title')
    expect(title).toHaveTextContent('Title (Author)')
    expect(title).toBeVisible()
  })

  it('should hide full blog informartion at start', () => {
    const fullContent = component.container.querySelector('.blog-full-info')
    expect(fullContent).not.toBeVisible()
  })

  it('should display full blog informartion after clicking', () => {
    const toggleDiv = component.container.querySelector('.blog-row')
    fireEvent.click(toggleDiv)

    const fullContent = component.container.querySelector('.blog-full-info')
    expect(fullContent).toBeVisible()
  })

})