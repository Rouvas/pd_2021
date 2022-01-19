const express = require('express'),
router = express.Router()

const {ErrorHandler} = require('../error')
const {jwtCheck} = require('../common')

const Department = require('../models/departments')


router.get('/', async (req, res, next) => {
  try {
    let departments = await Department.find()
    if (!departments) throw new ErrorHandler(404, 'Департаменты не найдены!')
    res.status(200).send(departments)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let { department } = req.body
    let newDepartment = new Department({
      department: department
    })
    await newDepartment.save()
    res.status(200).send(newDepartment)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    if (!req.body.department) throw new ErrorHandler(400, 'Поле департамент обязательное!')

    let department = await Department.findOneAndUpdate(
      {_id: req.params.id},
      {
        $set: {
          department: req.body?.department
        }
      }
    )

    res.status(200).send(department)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Department.findByIdAndDelete(req.params.id)
    res.status(200).send({message: "Департамент был успешно удалён!"})
  } catch (error) {
    next(error)
  }
})

module.exports = router

