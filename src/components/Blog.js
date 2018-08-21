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

  handleDeleteClick = () => {
    const blog = this.props.blog
    if (window.confirm(`delete ${blog.title} by ${blog.author}`)) {
      blogService.deleteBlog(blog._id)
      this.props.deleteBlog(blog._id)
    }
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

    let show 

    if (blog.user === undefined) {
      show = ''
    } else if (blog.user.username === this.props.userNow.username) {
      show = ''
    } else {
      show = 'none'
    }
    
    const deleteButtonStyle = {
      borderRadius: 5,
      backgroundColor: 'rgb(30,144,255)',
      display: show
    }

    let username
    if (blog.user === undefined) {
      username = 'anonymous'
    } else {
      username = blog.user.name
    }

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
          &nbsp; added by {username}
          <br />
          &nbsp; <button style={deleteButtonStyle} onClick={this.handleDeleteClick}>delete</button>
        </div>
      </div>
    )
  }
}

export default Blog