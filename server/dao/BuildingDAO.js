const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Building = new Schema({
  building_name: {
    type: String
  },
  short_name: {
    type: String
  },
  floors: {
    type: Number
  },
  Rooms: {
    type: Object
  }
}, {
  collection: 'Building'
})

Building.methods.getRoomByRoomId = function (roomId, callback) {
  return this.model('Building').aggregate([
    {
      '$match': { 'Rooms.room': roomId }
    },
    {
      '$project': {
        'rooms': {
          '$filter': {
            'input': '$Rooms',
            'as': 'room',
            'cond': { '$eq': [ '$$room.room', roomId ] }
          }
        }
      }
    }
  ], callback)
}

module.exports = mongoose.model('Building', Building)
