const mongoClient = require('mongodb').MongoClient
const url = 'mongodb://hanami:hanami02@ds131765.mlab.com:31765/ooad_kob'
const dbName = 'ooad_kob'

class WebDAO {
  /* ===========[User DAO]=================== */

  getAllUser() {
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

  getUserByUsername(username) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        db.collection('User').findOne({ 'username': username }, (err, data) => {
          if (err) { throw err }
          return resolve(data)
        })
      })
    })
  }

  insertUser(user) {
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
  getLatestGlobalData() {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        db.collection('GlobalData').find({}).sort({ _id: -1 }).limit(1).toArray((err, data) => {
          if (err) { throw err }
          return resolve(data)
        })
      })
    })
  }
  insertCourse(course) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        db.collection('Subject').findOne({ 'subject_id': course.subjectId }, (err, data) => {
          if (err) { throw err }
          if (!data) {
            this.getLatestGlobalData().then((data) => {
              db.collection('Subject').findOneAndUpdate({ 'subject_id': course.subjectId }, {
                $push: {
                  "courses":
                  {
                    "school_year": data.currentStudyYear,
                    "courseId": getNextSequence('courseId'),
                    "semester": data.currentStudyTerm,
                    "max_students": course.students,
                    "max_groups": course.groups
                  }
                }
              }, (err, data) => {
                if (err) { throw err }
                return resolve(data)
              })
            })
          } else { return resolve(false) }
        })
      })
    })
  }
  insertManyUsers(users) {
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

  editUser(newUserData) {
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

  deleteUserByUsername(username) {
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

  getAllUserByType(type) {
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

  getAllUserByTypeAndUsername(type, username) {
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

  getAllFaculty() {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        db.collection('Faculty').find({}).toArray((err, data) => {
          if (err) { throw err }
          return resolve(data)
        })
      })
    })
  }

  getAllSubject() {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        db.collection('Subject').find({}).toArray((err, data) => {
          if (err) { throw err }
          return resolve(data)
        })
      })
    })
  }
  /* ===========[Score DAO]=================== */
  getScoreByUsername(username) {
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
}

module.exports = WebDAO
