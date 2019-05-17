const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Building = new Schema({
  buildingname: {
    type: String
  },
  room: {
    type: String
  },
  short_name: {
    type: String
  }
}, {
  collection: 'Building'
})

module.exports = mongoose.model('Building', Building)
