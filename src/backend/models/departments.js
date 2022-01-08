const uniqueValidator = require('mongoose-unique-validator')
const mongoose = require('mongoose')


const DepartmentSchema = new mongoose.Schema({

  department: {
    type: String,
    required: true
  }
})

DepartmentSchema.plugin(uniqueValidator)

const Department = mongoose.model('Department', DepartmentSchema, 'departments')


module.exports = Department