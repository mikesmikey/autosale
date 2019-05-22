const express = require('express')
const expPretty = require('express-prettify')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const UserRouter = require('./router/UserRouter')
const SubjectRouter = require('./router/SubjectRouter')
const ExamRouter = require('./router/ExamRouter')
const AuthRouter = require('./router/AuthRouter')
const FacultyRouter = require('./router/FacultyRouter')
const GlobalDataRouter = require('./router/GlobalDataRouter')
const BuildingRouter = require('./router/BuildingRouter')

const app = express()
const port = 5000
// const cors= require('cors')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(expPretty({ query: 'pretty' }))
// app.use(cors())
// disable cors due to the server will not using cross origin feature.

//var dbname = 'ooad_kob'
 var dbname = 'courseTest' //<--เอาไว้ทำเทสเพิ่มข้อมูลการเรียน
mongoose.Promise = global.Promise
mongoose.connect(`mongodb+srv://jeff:jeff123@cluster0-mumpe.mongodb.net/${dbname}?retryWrites=true`, { useNewUrlParser: true })

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // we're connected!
  console.log('connected to mongoose')
})

app.use('/user', UserRouter)
app.use('/exam', ExamRouter)
app.use('/auth', AuthRouter)
app.use('/subject', SubjectRouter)
app.use('/faculty', FacultyRouter)
app.use('/yearAndTerm', GlobalDataRouter)
app.use('/building', BuildingRouter)

app.listen(port, () => {
  console.log(`App listening on ${port}`)
})

module.exports = app
