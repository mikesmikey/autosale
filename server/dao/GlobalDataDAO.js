const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GlobalData = new Schema({
  currentStudyYear: {
    type: String
  },
  currentStudyTerm: {
    type: String
  }
}, {
  collection: 'GlobalData'
})

module.exports = mongoose.model('GlobalData', GlobalData)
