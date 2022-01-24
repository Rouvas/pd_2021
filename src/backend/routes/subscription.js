const express = require('express'),
router = express.Router()
const webpush = require('web-push');

const {ErrorHandler} = require('../error')

const Pass = require('../models/pass')
const Subscription = require('../models/subscription')


router.post('/subscription', async (req, res, next) => {
  try {
    let newSub = req.body
    let createdSub = await Subscription.create(newSub)
    res.status(200).send({message: "Подписка создана", subObject: createdSub})
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
        title: 'PolyPACS',
        body: `В работе ${filteredPass.length} пропусков`,
        icon: 'assets/icons/icon.png'
      }
    };

    subs.forEach(sub => {
      webpush.sendNotification(sub, JSON.stringify(notificationPayload)).catch(
          err => console.log(err)
      )
    })

    res.status(200).send({message: "Система уведомлений подключена"})
  } catch (error) {
    next(error)
  }
})

module.exports = router
