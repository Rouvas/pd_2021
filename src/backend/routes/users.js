const User = require('../models/user')

const express = require('express'),
router = express.Router()

// TODO: add jwt check
// TODO: add error handler
router.get('/', async (req, res, next) => {
  try {
    let users = await User.find()
    res.status(200).send(users)
  } catch (error) {
    res.status(404).send({message: "Users not found"})
  }
})

// TODO: add jwt check
// TODO: add error handler
router.get('/:id', async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id)
    res.status(200).send(user)
  } catch (error) {
    res.status(404).send({message: 'User not found'})
  }
})

// TODO: add jwt check
// TODO: add roles check
// TODO: add error handler
router.post('/', async (req, res, next) => {
  try {
    let {login, password, name, surname, lastname, role, department} = req.body

    let salt = bcrypt.genSaltSync(10)
    let cryptesPassword =  bcrypt.hashSync(password, salt)

    let newUser = new User({
      login, 
      password: cryptesPassword, 
      name, 
      surname, 
      lastname, 
      role, 
      department
    })

    await newUser.save()

    res.status(200).send(newUser)
  } catch (error) {
    res.status(500).send("add Error handler")
  }
})


// TODO: add jwt check
// TODO: add roles check
// TODO: add error handler
router.patch('/:id', async (req, res, next) => {
  try {
    let id = req.params.id
    let body = req.body

    let user = await User.findOneAndUpdate(
      {_id: id},
      {
        $set: {
          login: body?.login
        }
      }
    )

    res.status(200).send(user)
  } catch (error) {
    res.status(500).send("add Error handler")
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).send({message: 'User was deleted successfuly'})
  } catch (error) {
    res.status(500).send("add Error handler")
  }
})





module.exports = router