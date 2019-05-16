const express = require('express')
const FacultyRouter = express.Router()
// const app = express()
const Faculty = require('../dao/FacultyDAO')

FacultyRouter.route('/').get((req, res) => {
  Faculty.find().select({ '_id': 0 }).then(function (facultys) {
    if (facultys.length > 0) {
      res.json(facultys)
    } else {
      res.sendStatus(404)
    }
  })
})

module.exports = FacultyRouter

//   getAllFaculty () {
//     return new Promise((resolve, reject) => {
//       mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
//         if (err) { resolve(null) }

//         const db = client.db(dbName)
//         db.collection('Faculty').find({}).project({ '_id': 0 }).toArray((err, data) => {
//           if (err) { throw err }
//           client.close()
//           data.found = true
//           return resolve(data)
//         })
//         client.close()
//       })
//     })
//   }
