import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      note: null,
      noteName: '',
      title: '',
      author: '',
      url: ''
    }
  }

  componentDidMount = async() => {
    const blogs = await blogService.getAll()
    this.setState({ blogs })
    
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  } 

  addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

    const newBlog = await blogService.create(blogObject)
    this.setState({
      blogs: this.state.blogs.concat(newBlog),
      note: `a new blog '${newBlog.title}' by ${newBlog.author} added`,
      noteName: 'add',
      title: '',
      author: '',
      url: ''
    })

    setTimeout(() => {
      this.setState({ note: null, noteName: '' })
    }, 5000);

  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      this.setState({
        username: '',
        password: '',
        user
      })
    } catch (exception) {
      this.setState({
        note: 'käyttäjätunnus tai salasana virheellinen',
        noteName: 'error'
      })
      setTimeout(() => {
        this.setState({ note: null, noteName: '' })
      }, 5000);
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  blogForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        <div>
          {this.state.user.name} logged in &nbsp;
          <button onClick={() => {window.localStorage.removeItem('loggedBlogappUser')}}>logout</button>
        </div>
        <br/>
          {this.state.blogs.map(blog => 
            <Blog key={blog._id} blog={blog}/>
          )}
        <div>
          <h3>create new</h3>
          <form onSubmit={this.addBlog}>
          <div>
            title: &nbsp;
            <input 
              value={this.state.title}
              name="title"
              onChange={this.handleChange}
            />
          </div>
          <div>
            author: &nbsp;
            <input
              value={this.state.author}
              name="author"
              onChange={this.handleChange}
            />
          </div>
          <div>
            url: &nbsp;
            <input
              value={this.state.url}
              name="url"
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">create</button>
          </form>
        </div>
      </div>
    )
  }

  loginForm = () => {
    return (
      <div>
          <h2>Log in to application</h2>
          <form onSubmit={this.login}>
            <div>
              username: &nbsp;
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
            <div>
              password: &nbsp;
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
    )
  }

  notification = () => {
    if (this.state.note === null) {
      return null
    }
    return (
      <div className={this.state.noteName}>
        {this.state.note}
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.notification()}
        {this.state.user === null ?
          this.loginForm() :
          this.blogForm()}
      </div>
    )
  }
}

export default App;
