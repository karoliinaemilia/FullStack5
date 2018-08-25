import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
  
  let blogComponent
  let blog
  const user = {}
  const mockhandler = jest.fn()
    
  blog = {
    title: "TDD harms  architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 10
  }
  
  beforeEach(() => {
    blogComponent = shallow(<Blog blog={blog} userNow={user} deleteBlog={mockhandler}/>)
  })
    
  it('at start details are not displayed', () => {
    const contentDiv = blogComponent.find('.content')
    expect(contentDiv.getElement().props.style).toEqual({ display: 'none' })
  })

  it('after clicking name the details are displayed', () => {
    const nameDiv = blogComponent.find('.names')
    nameDiv.simulate('click')

    const contentDiv = blogComponent.find('.content')
    expect(contentDiv.getElement().props.style).toEqual({ display: '' })
  })
})