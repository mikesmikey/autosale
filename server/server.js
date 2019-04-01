const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000
// const cors= require('cors')
app.use(bodyParser.json())
// app.use(cors())

// disable cors due to the server will not using cross origin feature.

const WebDAO = require('./WebDAO')
const WebService = require('./WebService')

const WebDAOObj = new WebDAO()
const WebServiceObj = new WebService()

app.get('/users', (req, res) => {
  WebDAOObj.getAllUser().then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.get('/users/type/:userType', (req, res) => {
  WebDAOObj.getAllUserByType(req.params.userType).then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.get('/users/:type/:username', (req, res) => {
  WebDAOObj.getAllUserByTypeAndUsername(req.params.type, req.params.username).then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.post('/user', (req, res) => {
  WebDAOObj.insertUser(req.body.registerForm).then((pass) => {
    res.send(pass)
  })
})

app.get('/user/:username', (req, res) => {
  WebDAOObj.getUserByUsername(req.params.username).then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.post('/login', (req, res) => {
  WebServiceObj.loginAuth(req.body.loginInfo).then((pass) => {
    res.send(pass)
  })
})

app.post('/user/remove/:username', (req, res) => {
  WebDAOObj.deleteUserByUsername(req.params.username).then((pass) => {
    res.send(pass)
  })
})

app.post('/user/add', (req, res) => {
  WebDAOObj.insertUser(req.body.userData).then((pass) => {
    res.send(pass)
  })
})

app.post('/user/addmany', (req, res) => {
  WebDAOObj.insertManyUsers(req.body.userData).then((pass) => {
    res.send(pass)
  })
})

app.post('/user/edit', (req, res) => {
  WebDAOObj.editUser(req.body.userData).then((pass) => {
    res.send(pass)
  })
})

app.post('/autogenerate', (req, res) => {
  WebServiceObj.autoGenerateSampleUserData().then((pass) => {
    res.send(pass)
  })
})

app.get('/facultys', (req, res) => {
  WebDAOObj.getAllFaculty().then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.listen(port, () => {
  console.log(`App listening on ${port}`)
})
