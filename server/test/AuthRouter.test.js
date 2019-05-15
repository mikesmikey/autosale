/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../server')
var should = chai.should()

const User = require('../dao/UserDAO')

chai.use(chaiHttp)

describe('test login', () => {
  let user
  beforeEach((done) => {
    user = new User({ username: 'jeff', password: '123' })
    user.save()
      .then(() => done())
  })

  it('login success', (done) => {
    const username = 'jeff'
    const password = '123'
    chai.request(server).post('/auth/login').send({ loginInfo: { username: username, password: password } }).end((_err, res) => {
      res.should.have.status(200)
      res.should.be.json
      res.body.should.be.a('object')
      res.body.should.have.property('userData')
      res.body.should.have.property('token')
      done()
    })
  })

  it('login fail because user not found', (done) => {
    const username = 'jerk'
    const password = '123'
    chai.request(server).post('/auth/login').send({ loginInfo: { username: username, password: password } }).end((_err, res) => {
      res.should.have.status(200)
      res.should.be.json
      res.body.should.be.a('object')
      res.body.should.have.property('error')
      res.body.error.should.equal('wrong-username')
      done()
    })
  })

  it('login fail because wrong password', (done) => {
    const username = 'jeff'
    const password = '007'
    chai.request(server).post('/auth/login').send({ loginInfo: { username: username, password: password } }).end((_err, res) => {
      res.should.have.status(200)
      res.should.be.json
      res.body.should.be.a('object')
      res.body.should.have.property('error')
      res.body.error.should.equal('wrong-password')
      done()
    })
  })

  afterEach((done) => {
    user.deleteOne({ username: user.username }).then(() => {
      done()
    })
  })
})
