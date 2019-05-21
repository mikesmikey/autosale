/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('./testHelper')
var should = chai.should()
const md5 = require('md5')

const User = require('../dao/UserDAO')

chai.use(chaiHttp)

describe('C: create user test', () => {
  const userForm = {
    userData: {
      'username': 'jeff',
      'password': '123',
      'typeOfUser': 'student'
    }
  }

  it('successful add user', (done) => {
    chai.request(server).post('/user/add').send(userForm).end((_err, res) => {
      res.should.have.status(200)
      res.should.be.json
      res.body.should.be.a('boolean')
      res.body.should.equal(true)
      done()
    })
  })

  it('unsuccessful add user', (done) => {
    const user = new User(userForm.userData)
    user.save().then(() => {
      chai.request(server).post('/user/add').send(userForm).end((_err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('boolean')
        res.body.should.equal(false)
        done()
      })
    })
  })

  afterEach((done) => {
    User.deleteOne({ username: userForm.userData.username }).then(() => {
      done()
    })
  })
})

describe('R: read user test', () => {
  let user
  beforeEach((done) => {
    user = new User({
      'username': 'jeff',
      'password': '123',
      'typeOfUser': 'student'
    })
    user.save()
      .then(() => done())
  })

  it('get all user', (done) => {
    chai.request(server).get('/user').end((_err, res) => {
      res.should.have.status(200)
      res.should.be.json
      res.body.should.be.a('array')
      res.body[0].should.be.a('object')
      done()
    })
  })

  it('get many user by type', (done) => {
    chai.request(server).get('/user/type/' + user.typeOfUser + '/0/0').end((_err, res) => {
      res.should.have.status(200)
      res.should.be.json
      res.body.should.be.a('array')
      res.body[0].should.be.a('object')
      res.body[0].typeOfUser.should.equal(user.typeOfUser)
      done()
    })
  })

  it('get many user by type and username', (done) => {
    chai.request(server).get('/user/' + user.typeOfUser + '/' + user.username + '/0/0').end((_err, res) => {
      res.should.have.status(200)
      res.should.be.json
      res.body.should.be.a('array')
      res.body[0].should.be.a('object')
      res.body[0].username.should.equal(user.username)
      res.body[0].typeOfUser.should.equal(user.typeOfUser)
      done()
    })
  })

  it('get one user by username', (done) => {
    chai.request(server).get('/user/' + user.username).end((_err, res) => {
      res.should.have.status(200)
      res.should.be.json
      res.body.should.be.a('object')
      res.body.should.have.property('username')
      done()
    })
  })

  afterEach((done) => {
    User.deleteOne({ username: user.username }).then(() => {
      done()
    })
  })
})

describe('U: update user test', () => {
  let user
  beforeEach((done) => {
    user = new User({
      'username': 'jeff',
      'password': '123',
      'typeOfUser': 'student'
    })
    user.save()
      .then(() => done())
  })

  it('edit one user', (done) => {
    const data = {
      userData: {
        'username': 'jeff',
        'password': '123456'
      }
    }

    chai.request(server).post('/user/edit').send(data).end((_err, res) => {
      res.should.have.status(200)
      User.findOne({ 'username': user.username }, (_err, user) => {
        user.should.be.a('object')
        user.should.have.property('password')
        user.password.should.equal(md5(data.userData.password))
        done()
      })
    })
  })

  afterEach((done) => {
    User.deleteOne({ username: user.username }).then(() => {
      done()
    })
  })
})

describe('D: delete user test', () => {
  let user
  beforeEach((done) => {
    user = new User({
      'username': 'jeff',
      'password': '123',
      'typeOfUser': 'student'
    })
    user.save()
      .then(() => done())
  })

  it('delete one user', (done) => {
    chai.request(server).post('/user/remove/' + user.username).end((_err, res) => {
      res.should.have.status(200)
      User.findOne({ 'username': user.username }, (_err, user) => {
        should.not.exist(user)
        done()
      })
    })
  })

  afterEach((done) => {
    User.deleteOne({ username: user.username }).then(() => {
      done()
    })
  })
})
