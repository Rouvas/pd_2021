
const uniqueValidator = require('mongoose-unique-validator')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    index: true,
    unique: true,
    validate: {
      validator: (v) => {
        return v.length >= 2
      },
      message: props => `${props.value} минимальная длина логина 5 символа!`
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return v.length >= 6
      },
      message: props => `${props.value} минимальная длина пароля 6 символов!`
    }
  },
  name: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return v.length >= 2
      },
      message: props => `${props.value} минимальная длина имяни 2 символа!`,
    }
  },
  surname: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return v.length >= 2
      },
      message: props => `${props.value} минимальная фамилии 2 символа!`,
    },
  },
  lastname: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return v.length >= 2
      },
      message: props => `${props.value} минимальная фамилии 2 символа!`,
    },
  },
  role: {
    type: String,
    enum: ['worker', 'admin', 'bureau'],
    required: true,
  },
  department: {
    type: String,
    ref: 'Department',
    required: false,
    default: 'Не указано'
  }
  
})

UserSchema.plugin(uniqueValidator)

const User = mongoose.model('User', UserSchema, 'users')

module.exports = User
