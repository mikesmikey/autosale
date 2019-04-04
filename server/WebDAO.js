const mongoClient = require('mongodb').MongoClient
const url = 'mongodb://hanami:hanami02@ds131765.mlab.com:31765/ooad_kob'
const dbName = 'ooad_kob'

class WebDAO {
  /* ===========[User DAO]=================== */
  getAllUser () {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        db.collection('User').find({}).project({ '_id': 0, 'password': 0 }).toArray((err, data) => {
          if (err) { throw err }
          return resolve(data)
        })
      })
    })
  }

  getUserByUsername (username) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        db.collection('User').findOne({ 'username': username }, { '_id': 0, 'password': 0 }, (err, data) => {
          if (err) { throw err }
          return resolve(data)
        })
      })
    })
  }

  insertUser (user) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        db.collection('User').findOne({ 'username': user.username }, (err, data) => {
          if (err) { throw err }
          if (!data) {
            db.collection('User').insertOne(user, (err, result) => {
              if (err) { throw err }
              return resolve(true)
            })
          } else { return resolve(false) }
        })
      })
    })
  }

  addManyStudents (users) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        db.collection('User').insertMany(users, (err, result) => {
          if (err) { throw err }
          return resolve(true)
        })
      })
    })
  }

  editUser (newUserData) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        db.collection('User').findOneAndUpdate({ 'username': newUserData.username }, { '$set': newUserData }, (err, result) => {
          if (err) { throw err }
          if (result.value) {
            return resolve(true)
          } else { return resolve(false) }
        })
      })
    })
  }

  deleteUserByUsername (username) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        db.collection('User').findOne({ 'username': username }, (err, data) => {
          if (err) { throw err }
          if (data) {
            db.collection('User').deleteOne({ username }, (err, result) => {
              if (err) { throw err }
              return resolve(true)
            })
          } else { return resolve(false) }
        })
      })
    })
  }

  getAllUserByType (type) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        db.collection('User').find({ 'typeOfUser': type }).limit(16).project({ '_id': 0, 'password': 0 }).toArray((err, data) => {
          if (err) { throw err }
          return resolve(data)
        })
      })
    })
  }

  getAllUserByTypeAndUsername (type, username) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        const regex = new RegExp(`${username}`)
        db.collection('User').find({ 'username': regex, 'typeOfUser': type }).limit(16).project({ '_id': 0, 'password': 0 }).toArray((err, data) => {
          if (err) { throw err }
          return resolve(data)
        })
      })
    })
  }
  /* ===========[Faculty DAO]=================== */
  getAllFaculty () {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        db.collection('Faculty').find({}).project({ '_id': 0 }).toArray((err, data) => {
          if (err) { throw err }
          return resolve(data)
        })
      })
    })
  }
  /* ===========[Score DAO]=================== */
  getScoreByUsername (username) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        db.collection('User').findOne({ 'username': username }, { '_id': 0, 'password': 0 }, (err, data) => {
          if (err) { throw err }
          return resolve(data)
        })
      })
    })
  }
  /* ===========[GlobalData DAO]=================== */
  getYearAndTerm () {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        db.collection('GlobalData').find({}).toArray((err, data) => {
          if (err) { throw err }
          return resolve(data)
        })
      })
    })
  }

  editYearAndTerm (newGlobalData) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        db.collection('GlobalData').findOneAndUpdate({ 'id': newGlobalData.id }, { '$set': newGlobalData }, (err, result) => {
          if (err) { throw err }
          if (result.value) {
            return resolve(true)
          } else { return resolve(false) }
        })
      })
    })
  }

  /* ===========[Subject DAO]=================== */
  getAllSubjectBySubjectIdOrSubjectName (subjid, subjname) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        db.collection('Subject').find({ '$or': [{ 'subject_id': subjid }, { 'subject_name': subjname }] }).limit(16).project({ '_id': 0 }).toArray((err, data) => {
          if (err) { throw err }
          return resolve(data)
        })
      })
    })
  }

  getAllSubject () {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        db.collection('Subject').find({}).project({ '_id': 0 }).toArray((err, data) => {
          if (err) { throw err }
          console.log(data)
          return resolve(data)
        })
      })
    })
  }

  insertSubject (subject) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        db.collection('Subject').findOne({ '$or': [{ 'subject_id': subject.subject_id }, { 'subject_name': subject.subject_name }] }, (err, data) => {
          if (err) { throw err }
          if (!data) {
            db.collection('Subject').insertOne(subject, (err, result) => {
              if (err) { throw err }
              return resolve(true)
            })
          } else { return resolve(false) }
        })
      })
    })
  }
}

module.exports = WebDAO
