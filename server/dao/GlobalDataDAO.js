const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GlobalData = new Schema({
  currentStudyYear: {
    type: Number
  },
  currentStudyTerm: {
    type: Number
  }
}, {
  collection: 'GlobalData'
})

module.exports = mongoose.model('GlobalData', GlobalData)
