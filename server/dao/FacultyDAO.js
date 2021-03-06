const mongoose = require('mongoose')

const Schema = mongoose.Schema

var Faculty = new Schema({
  facultyId: {
    type: Number
  },
  facultyName: {
    type: String
  },
  branches: {
    type: Object
  }
}, {
  collection: 'Faculty'
})

module.exports = mongoose.model('Faculty', Faculty)
