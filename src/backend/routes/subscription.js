const express = require('express'),
router = express.Router()

const {ErrorHandler} = require('../error')
const Pass = require('../models/pass')

const Subscription = require('../models/subscription')


router.post('/subscription', async (req, res, next) => {
  try {
    let newSub = req.body
    let createdSub = await Subscription.create(newSub)
    res.status(200).send(createdSub)
  } catch (error) {
    next(error)
  }
})


router.post('/send-notification', async (req, res, next) => {
  try {

    let pass = await Pass.find()
    let filteredPass = pass.filter(p => p.status == 0)


    let subs = await Subscription.find()
    
    const notificationPayload = {
      notification: {
        title: 'PolyPacs',
        body: `На вас успешно создали пропуск!` ,
        icon: 'assets/icons/icon-512x512.png'
      }
    };

    subs.forEach(s => {
      webpush.sendNotification(s, JSON.stringify(notificationPayload));
    })

    res.status(200).send(passes)
  } catch (error) {
    next(error)
  }
})

