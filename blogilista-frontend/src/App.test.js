import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe.only('<App />', () => {
  let app
  let user

  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('only login form is rendered', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(0)
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      user = {
        username: 'tester',
        token: '123123123123',
        name: 'Teuvo Testaaja'
      }
      localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      app = mount(<App />)
    })

    it('all blogs are rendered', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })
})