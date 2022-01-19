const uniqueValidator = require('mongoose-unique-validator')
const mongoose = require('mongoose')

const PassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uniqueId: {
    type: Number,
    default: Math.floor(Math.random() * (99999 - 10000) + 10000),
    required: false
  },
  surname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  passport: {
    type: String,
    required: false,
  },
  goingTo: {
    type: String,
    required: false
  },
  carPlate: {
    type: String,
    required: false,
    default: null
  },
  allowedLocations: [{
    type: String,
    required: false,
    enum: ['0', '1', '2', '3']
  }],
  date: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['0', '1', '2']
  },
  type: {
    type: String,
    required: true,
    enum: ['0', '1']
  }
})

PassSchema.plugin(uniqueValidator)

const Pass = mongoose.model('Pass', PassSchema, 'pacs')


module.exports = Pass
