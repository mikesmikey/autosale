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
        db.collection('User').findOne({ 'username': username }, (err, data) => {
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

  insertManyUsers (users) {
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

  getAllFaculty () {
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

  /* ===========[Score DAO]=================== */

  getAllExamByUsername (username) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        if (_err) { resolve(null) }
        const db = client.db(dbName)
        db.collection('Exam').find({ 'ExamSeat.studentCode': username }).project({ '_id': 0, 'password': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  getAllExamBySubjectId (SubjectId, username) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        if (_err) { resolve(null) }
        const db = client.db(dbName)
        const regex = new RegExp(`${SubjectId}`)
        db.collection('Exam').find({ 'subjectId': regex, 'ExamSeat.studentCode': username }).project({ '_id': 0, 'password': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  getAllSubject () {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        if (_err) { resolve(null) }
        const db = client.db(dbName)
        db.collection('Subject').find({}).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
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
        db.collection('GlobalData').findOneAndUpdate({}, { '$set': newGlobalData }, (err, result) => {
          if (err) { throw err }
          if (result.value) {
            return resolve(true)
          } else { return resolve(false) }
        })
      })
    })
  }

  /* ===========[Room DAO]=================== */
  getAllBuilding () {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        if (_err) { resolve(null) }
        const db = client.db(dbName)
        db.collection('Building').find({}).project({ '_id': 0, 'password': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  getAllBuildingByRoom (buildingname, roomname) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        if (_err) { resolve(null) }
        const db = client.db(dbName)
        const regex = new RegExp(`${roomname}`)
        db.collection('Building').find({ 'building_name': buildingname, 'Rooms.room': regex }).project({ '_id': 0, 'password': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  editRoom (newBuildingData) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        db.collection('Building').findOneAndUpdate({ 'building_name': newBuildingData.building_name }, { '$set': newBuildingData }, (err, result) => {
          if (err) { throw err }
          if (result.value) {
            return resolve(true)
          } else { return resolve(false) }
        })
        client.close()
      })
    })
  }
}

module.exports = WebDAO
