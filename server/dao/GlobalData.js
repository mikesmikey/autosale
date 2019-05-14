const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GlobalData = new Schema({
  currentStudyYear: {
    type: Int32Array
  },
  currentStudyTerm: {
    type: Int32Array
  }
}, {
  collection: 'GlobalData'
})

module.exports = mongoose.model('GlobalData', GlobalData)
