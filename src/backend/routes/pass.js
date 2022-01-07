
const express = require('express'),
router = express.Router()

const {workerCheck, bureauCheck, jwtCheck, adminCheck } = require('../common.js')
const {ErrorHandler} = require('../error')

const Pass = require('../models/pass')



router.get('/', async (req, res, next) => {
  try {
    let passes = await Pass.find()
    res.status(200).send(passes)
  } catch (error) {
    next(error)
  }
})

router.get('/verify/:id', async (req, res, next) => {
  try {
    let pass = await Pass.findById(req.params.id)
    if (!pass) throw new ErrorHandler(404, "Пропуск не найден!")
    res.status(200).send(pass)
  } catch (error) {
    next(error)
  }
})

router.post('/', jwtCheck,  async (req, res, next) => {
  try {
    let {passport, goingTo, name, surname, lastname, allowedLocations, carPlate, type} = req.body

    let pass

    if (type === '0') {
      pass = new Pass({
        passport: passport,
        goingTo: goingTo,
        createdBy: req.tokenData._id,
        status: req.tokenData.role == 'worker' ? '0' : '1',
        name: name,
        surname: surname,
        lastname: lastname,
        type: type,
      })
    } else {
      pass = new Pass({
        passport: passport,
        goingTo: goingTo,
        createdBy: req.tokenData._id,
        status: req.tokenData.role == 'worker' ? '0' : '1',
        name: name,
        surname: surname,
        lastname: lastname,
        type: type,
        allowedLocations: allowedLocations,
        carPlate: carPlate
      })
    }

    await pass.save()

    res.status(200).send(pass)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', adminCheck, bureauCheck,  async (req, res, next) => {
  try {
    await Pass.findByIdAndDelete(req.params.id)
    res.status(200).send({message: 'Pass was deleted successfuly'})
  } catch (error) {
    next(error)
  }
})

router.patch('/change-status/:id', adminCheck, bureauCheck, async (req, res, next) => {
  try {
    let id = req.params.id
    let body = req.body

    let pass = await Pass.findOneAndUpdate(
      {_id: id},
      {
        $set: {
          status: body?.status
        }
      }
    )

    res.status(200).send(user)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.post('/verify-pass', async (req, res, next) => {
  try {
    let {surname, uniqueId} = req.body

    let pass = await Pass.findOne({surname, uniqueId})

    if (!pass) res.status(404).send({message: "Пропуск не найден"})

    res.status(200).send(pass)
  } catch (error) {
    next(error)
  }
})


module.exports = router
