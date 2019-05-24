import React from 'react'
import { render, waitForElement, act, cleanup } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

afterEach(cleanup)

describe('App', () => {

  it('should not display any blogs if the user is not signed in', async () => {
    let content
    act(() => { content = render(<App />) })
  
    await waitForElement(() => content.getByText('log in'))
    expect(content.container.querySelectorAll('.blog-row').length).toBe(0)
  })

  it('should display blogs if the user is signed in', async () => {
    let content
    const user = {
      username: 'tester',
      token: '123456789',
      name: 'Tester Guy'
    }
  
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    act(() => { content = render(<App />) })

    await waitForElement(() => content.getByText('Tester Guy logged in'))
    await waitForElement(() => content.getByText(
      'Selain pystyy suorittamaan vain javascriptiä (Matti Luukkainen)'
    ))
    expect(content.container.querySelectorAll('.blog-row').length).toBe(3)
  })

})