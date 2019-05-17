const express = require('express')
const BuildingRouter = express.Router()
// const app = express()
const Building = require('../dao/BuildingDAO')

BuildingRouter.route('/').get((req, res) => {
  Building.find({}).toArray().then(function (data) {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

BuildingRouter.route('/:buildingname/:room').get((req, res) => {
  const regex = new RegExp(`${req.params.room}`)
  Building.find({ 'building_name': req.params.buildingname, 'Rooms.room': regex }).select({ '_id': 0, 'password': 0 }).then(function (users) {
    if (users) {
      res.json(users)
    } else {
      res.sendStatus(404)
    }
  })
})

BuildingRouter.route('/edit').post((req, res) => {
  const newBuildingData = req.params.userData
  Building.findOneAndUpdate({ 'building_name': newBuildingData.building_name }, { '$set': newBuildingData }).then((result) => {
    if (result.value) {
      res.send(true)
    } else {
      res.send(false)
    }
  })
})

BuildingRouter.route('/remove/:short_name', (req, res) => {
  Building.findOne({ 'short_name': req.params.short_name }, (err, data) => {
    if (err) { throw err }
    if (data) {
      Building.deleteOne({ 'short_name': req.params.short_name }, (err, result) => {
        if (err) { throw err }
        res.send(result)
      })
    } else {
      res.sendStatus(404)
    }
  })
})

BuildingRouter.route('/add', (req, res) => {
  Building.findOne({ 'short_name': req.body.buildingData.short_name }, (err, data) => {
    if (err) { throw err }
    if (!data) {
      Building.insertOne(req.body.buildingData, (err, result) => {
        if (err) { throw err }
        res.send(true)
      })
    } else {
      res.send(false)
    }
  }).then((pass) => {
    res.send(pass)
  })
})

BuildingRouter.route('/room/id=:roomId', (req, res) => {
  Building.aggregate(
    [
      {
        '$match': { 'Rooms.room': req.params.roomId }
      },
      {
        '$project': {
          'rooms': {
            '$filter': {
              'input': '$Rooms',
              'as': 'room',
              'cond': { '$eq': [ '$$room.room', req.params.roomId ] }
            }
          }
        }
      }
    ]
  ).then(function (room) {
    if (room) {
      res.json(room)
    } else {
      res.sendStatus(404)
    }
  })
})


module.exports = BuildingRouter
