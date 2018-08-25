let token = null

const blogs = [
  {
    _id: '5b7aad8f5b20b6248e86ecdc',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violation/Go_To_Considered_Harmful.html',
    likes: 14
  },
  {
    _id: '5b7ae68e98de113d0bbb9f49',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: {
      _id: '5b7adfebff72113ac67a61ad',
      username: 'kkoivu',
      name: 'Karoliina Koivu'
    }
  },
  {
    _id: '5b7c53e96cf70972ff4206fc',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 10,
    user: {
      _id: '5b7af29ca4102d42b57ba9a4',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, blogs, setToken }