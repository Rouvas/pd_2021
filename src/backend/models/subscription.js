const mongoose = require('mongoose')

const SubscriptionSchema = new mongoose.Schema({
  endpoint: {
    type: String,
    required: true
  },
  expirationTime: {
    type: Number,
    default: null
  },
  keys: {
    p256dh: {
      type: String,
      required: true
    },
    auth: {
      type: String,
      required: true
    }
  }
})

const Subscription = mongoose.model('Subscription', SubscriptionSchema, 'subscription')

module.exports = Subscription