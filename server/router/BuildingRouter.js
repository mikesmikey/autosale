const express = require('express')
const BuildingRouter = express.Router()
// const app = express()
const Building = require('../dao/BuildingDAO')

BuildingRouter.route('/').get((req, res) => {
  Building.find(function (err, buildings) {
    if (err) {
      throw (err)
    }
    if (buildings) {
      res.json(buildings)
    } else {
      res.sendStatus(404)
    }
  })
})

BuildingRouter.route('/name=:short_name').get((req, res) => {
  Building.findOne({ 'short_name': req.params.short_name }, function (err, buildings) {
    if (err) {
      throw (err)
    }
    if (buildings) {
      res.json(buildings)
    } else {
      res.sendStatus(404)
    }
  })
})

BuildingRouter.route('/longname=:long_name').get((req, res) => {
  Building.findOne({ 'building_name': req.params.long_name }, function (err, buildings) {
    if (err) {
      throw (err)
    }
    if (buildings) {
      res.json(buildings)
    } else {
      res.sendStatus(404)
    }
  })
})

BuildingRouter.route('/room/id=:roomId').get((req, res) => {
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
    , function (err, buildings) {
      if (err) {
        throw (err)
      }
      if (buildings) {
        res.json(buildings)
      } else {
        res.sendStatus(404)
      }
    })
})

BuildingRouter.route('/name=:buildingName/room=:room').get((req, res) => {
  const regex = new RegExp(`${req.params.room}`)
  Building.find({ 'building_name': req.params.buildingName, 'Rooms.room': regex }, function (err, buildings) {
    if (err) {
      console.log(err)
    }
    if (buildings) {
      res.json(buildings)
    } else {
      res.sendStatus(404)
    }
  })
})

BuildingRouter.route('/add').post((req, res) => {
  Building.findOne({ 'short_name': req.body.buildingData.short_name }, (err, data) => {
    if (err) { throw err }
    if (!data) {
      const building = new Building(req.body.buildingData)
      building.save((err, result) => {
        if (err) { throw err }
        res.send(true)
      })
    } else {
      res.send(false)
    }
  })
})

BuildingRouter.route('/edit').post((req, res) => {
  Building.findOneAndUpdate({ 'building_name': req.body.BuildingData.building_name }, { '$set': req.body.BuildingData }, (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(err)
    if (result) {
      res.send(true)
    } else {
      res.send(false)
    }
  })
})

BuildingRouter.route('/remove/:short_name').post((req, res) => {
  Building.findOne({ 'short_name': req.params.short_name }, (err, data) => {
    if (err) { throw err }
    if (data) {
      Building.deleteOne({ 'short_name': req.params.short_name }, (err, result) => {
        if (err) { throw err }
        res.send(true)
      })
    } else {
      res.send(false)
    }
  })
})

module.exports = BuildingRouter
