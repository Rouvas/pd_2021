const express = require('express'),
router = express.Router()


const User = require('../models/user')
const {ErrorHandler} = require('../error')



router.get('/', async (req, res, next) => {
  try {
    let users = await User.find()
    if (!users) throw new ErrorHandler(404, 'Пользователи не найдены')
    res.status(200).send(users)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id)
    if (!user) throw new ErrorHandler(404, 'пользователь не найден!')
    res.status(200).send(user)
  } catch (error) {
    next(error)
  }
})

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
    next(error)
  }
})

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
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).send({message: 'User was deleted successfuly'})
  } catch (error) {
    next(error)
  }
})


module.exports = router