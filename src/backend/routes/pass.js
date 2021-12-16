const Pass = require('../models/pass')

const express = require('express'),
router = express.Router()



router.get('/', async (req, res, next) => {
  try {
    let passes = await Pass.find()
    res.status(200).send(passes)
  } catch (error) {
    res.status(500).send("add Error handler")
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let pass = await Pass.findById(req.params.id)
    res.status(200).send(pass)
  } catch (error) {
    res.status(500).send("add Error handler")
  }
})

router.post('/', async (req, res, next) => {
  try {
    let {user, passport, goingTo, date, endDate, createdBy, status} = req.body

    let pass = new Pass({
      user: user,
      passport: passport,
      goingTo: goingTo,
      date: date,
      endDate: endDate,
      createdBy: createdBy,
      status: status
    })

    await pass.save()

    res.status(200).send(pass)
  } catch (error) {
    res.status(500).send("add Error handler")
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Pass.findByIdAndDelete(req.params.id)
    res.status(200).send({message: 'Pass was deleted successfuly'})
  } catch (error) {
    res.status(500).send("add Error handler")
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
    res.status(500).send("add Error handler")
  }
})


module.exports = router