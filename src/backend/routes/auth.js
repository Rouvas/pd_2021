const express = require('express'),
router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const Session = require('../models/sessions')
const mongoose = require('mongoose')



router.post('/login', async (req, res, next) => {
  try {
    const { login, password } = req.body
    const user = await User.findOne({ login })
      .then((user) => {
        if (user) {
          const passwordIsEqual = bcrypt.compareSync(password, user.password)
          if (passwordIsEqual) {
            return user
          } else {
            res.status(403).send('Пароль не верный!')
          }
        } else {
          res.status(404).send('Пользователь не найден!')
        }
      })
      .then( async ({_id, role, name, surname, lastname, department}) => {
        const accessToken = jwt.sign({ _id, role }, process.env.PRIVATE_KEY)
        await Session.deleteOne({ userID: _id })
        let session = new Session({
          userID: _id,
          ip: req.ip,
          accessToken,
          createdAt: new Date(),
          expiresIn: new Date(+new Date() + Number(process.env.SESSION_DURATION)),
        })
        await session.save()
        return res.status(200).send({
          accessToken,
          user: { _id, role, name, surname, lastname, department}
        })
      })
  } catch (error) {
    res.status(500)
  }
})

// TODO: add jwt check
// TODO: add error handler
router.post('/logout', async (req, res, next) => {
  try {
    await Session.deleteMany({ _id: req.tokenData._id })
    res.status(200).send({message: "Loged Out"})
  } catch (error) {
    res.status(500).send({message: 'Something goes wrong'})
  }
})

// TODO: add jwt check
// TODO: add error handler
router.post('/register', async (req, res, next) => {
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

    const accessToken = jwt.sign({ _id: newUser._id, role }, process.env.PRIVATE_KEY)
    // console.log(accessToken)

    let session = new Session({
      userID: newUser._id,
      ip: req.ip,
      accessToken,
      createdAt: new Date(),
      expiresIn: new Date(+new Date() + Number(process.env.SESSION_DURATION)),
    })

    await newUser.save()
    await session.save()

    res.status(200).send({accessToken, user: newUser})
  } catch (error) {
    res.status(500).send({message: error})
  }
})



module.exports = router
