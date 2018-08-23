import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders author, title and likes', () => {
    const blog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 10
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const namesDiv = blogComponent.find('.names')
    const likesDiv = blogComponent.find('.likes')

    expect(namesDiv.text()).toContain(blog.title)
    expect(namesDiv.text()).toContain(blog.author)
    expect(likesDiv.text()).toContain(blog.likes)
  })
})