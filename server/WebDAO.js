const mongoClient = require('mongodb').MongoClient
const url = 'mongodb+srv://jeff:jeff123@cluster0-mumpe.mongodb.net/test?retryWrites=true'
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
        db.collection('GlobalData').findOneAndUpdate({}, { '$set': newGlobalData }, (err, result) => {
          if (err) { throw err }
          if (result.value) {
            return resolve(true)
          } else { return resolve(false) }
        })
      })
    })
  }

  /* ===========[Building DAO]=================== */
  getBuilding () {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        db.collection('Building').find({}).toArray((err, data) => {
          if (err) { throw err }
          return resolve(data)
        })
      })
    })
  }

  insertBuilding (building) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        db.collection('Building').findOne({ 'short_name': building.short_name }, (err, data) => {
          if (err) { throw err }
          if (!data) {
            db.collection('Building').insertOne(building, (err, result) => {
              if (err) { throw err }
              return resolve(true)
            })
          } else { return resolve(false) }
        })
      })
    })
  }

  deleteBuildingByShortName (shortname) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        db.collection('Building').findOne({ 'short_name': shortname }, (err, data) => {
          if (err) { throw err }
          if (data) {
            db.collection('Building').deleteOne({ 'short_name': shortname }, (err, result) => {
              if (err) { throw err }
              return resolve(true)
            })
          } else { return resolve(false) }
        })
      })
    })
  }

  getBuildingByShortName (shortname) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        const regex = new RegExp(`${shortname}`)
        db.collection('Building').find({ 'short_name': regex }).toArray((err, data) => {
          if (err) { throw err }
          return resolve(data)
        })
      })
    })
  }
}

module.exports = WebDAO
