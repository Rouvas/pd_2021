const uniqueValidator = require('mongoose-unique-validator')
const mongoose = require('mongoose')

const PassSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  passport: {
    type: String,
    required: true,
    unique: true
  },
  goingTo: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    default: new Date(+new Date() + 86400000)
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: Number,
    required: true,
    enum: ['0', '1', '2']
  }
})

PassSchema.plugin(uniqueValidator)

const Pass = mongoose.model('Pass', PassSchema, 'pacs')


module.exports = Pass
