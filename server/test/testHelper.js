
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://jeff:jeff123@cluster0-mumpe.mongodb.net/test?retryWrites=true', { userNewUrlParser: true })
mongoose.connection
  .once('open', () => console.log('Test Database Connected!'))
  .on('error', (error) => {
    console.warn('Error : ', error)
  })

beforeEach((done) => {
  mongoose.connection.dropDatabase(() => {
    done()
  })
})