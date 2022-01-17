const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const SessionSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  accessToken: {
    type: String,
    required: true
  },
  expiresIn: {
    type: Date,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
})

// SessionSchema.plugin(uniqueValidator)

const Session = mongoose.model('Session', SessionSchema, 'sessions')

module.exports = Session