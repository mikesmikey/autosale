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

GlobalData.methods.getYearAndTerm = function (callback) {
  return this.model('GlobalData').findOne({}, callback)
}

module.exports = mongoose.model('GlobalData', GlobalData)
