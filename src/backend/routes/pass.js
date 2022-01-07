
const express = require('express'),
router = express.Router()

const Pass = require('../models/pass')

const {workerCheck, bureauCheck } = require('../common.js')


router.get('/', async (req, res, next) => {
  try {
    let passes = await Pass.find()
    res.status(200).send(passes)
  } catch (error) {
    res.status(500).send("InternalError3")
  }
})

router.get('/verify/:id', async (req, res, next) => {
  try {
    let pass = await Pass.findById(req.params.id)
    res.status(200).send(pass)
  } catch (error) {
    res.status(500).send("InternalError4")
  }
})

router.post('/',  async (req, res, next) => {
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
    console.log(error)
    res.status(500).send("InternalError2")
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Pass.findByIdAndDelete(req.params.id)
    res.status(200).send({message: 'Pass was deleted successfuly'})
  } catch (error) {
    res.status(500).send("InternalError")
  }
})

router.patch('/:id', async (req, res, next) => {
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
    res.status(500).send("InternalError")
  }
})

router.get('/verify-pass', async (req, res, next) => {
  try {
    let {surname, uniqueId} = req.body

    let pass = await Pass.findOne({surname, uniqueId})

    res.status(200).send(pass)
  } catch (error) {
    console.log(error)
    res.status(404).send("Pass not found")
  }
})

module.exports = router