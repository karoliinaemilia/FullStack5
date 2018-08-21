import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
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
          &nbsp; {blog.likes} likes &nbsp; <button onClick={(() => {})}>like</button>
          <br/>
          &nbsp; added by {blog.username}
        </div>
      </div>
    )
  }
}

export default Blog