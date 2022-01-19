class ErrorHandler extends Error {
  constructor(code, message) {
    super()
    this.code = code
    this.message = message
  }
}
const handleError = (err, res) => {
  console.log(err)
  if (
    err &&
    err.name &&
    (err.name == 'MongoError' || err.name == 'ValidationError' || err.name == 'CastError')
  ) {
    let msg = ''
    for (field in err.errors) {
      msg += err.errors[field].message + ' \n'
    }
    return res.status(400).send(msg)
  } else if (err.code && err.message) {
    let { code, message } = err
    return res.status(code).send({message})
  }
  return res.status(500).send({message: "Что-то пошло не так!", error: err})
}
module.exports = {
  ErrorHandler,
  handleError,
}
