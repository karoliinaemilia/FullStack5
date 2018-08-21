import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      likes: this.props.blog.likes
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  handleLikeClick = () => {
    const blog = this.props.blog
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      likes: this.state.likes + 1
    }
    blogService.update(blog._id, blogObject)
    this.setState({ likes: this.state.likes + 1})
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const blog = this.props.blog

    const showWhenVisible = { display: this.state.visible ? '' : 'none'}
    
    return (
      <div style={blogStyle}>
        <div onClick={this.toggleVisibility} style={{cursor: 'pointer'}}>
          {blog.title} {blog.author}
        </div>
        <div style={showWhenVisible}>
          &nbsp; <a href={blog.url}>{blog.url}</a>
          <br/>
          &nbsp; {this.state.likes} likes &nbsp; <button onClick={this.handleLikeClick}>like</button>
          <br/>
          &nbsp; added by {blog.username}
        </div>
      </div>
    )
  }
}

export default Blog