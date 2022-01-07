const jwtMiddleware = require('express-jwt-middleware')
const Session = require('./models/sessions')

module.exports = {
  jwtCheck: jwtMiddleware(process.env.PRIVATE_KEY),
  adminCheck: (req, res, next) => {
    if (req.tokenData.role === 'admin') {
      next()
    } else {
      res.status(401).send({message: "Доступ закрыт!"})
    }
  },
  workerCheck: (req, res, next) => {
    if (req.tokenData.role === 'worker') {

      next()
    } else {
      res.status(401).send({message: "Доступ закрыт!"})
    }
  },
  bureauCheck: (req, res, next) => {
    if (req.tokenData.role === 'bureau') {

      next()
    } else {
      res.status(401).send({message: "Доступ закрыт!"})
    }
  },
  hackCheck: async (req, res, next) => {
    const clearToken = token => {
      if (/\s/g.test(token)) {
        return token.split(' ')[1]
      } else {
        return token
      }
    }
    try {
      const token = clearToken(req.headers.authorization)
      console.log(token)
      if (token.length > 0) {
        let foundSession = await Session.findOne({ accessToken: token })
        if (foundSession) {
          const isNotExpired = +foundSession.expiresIn - +new Date() > 0
          const isIPEqual = foundSession.ip === req.ip
          console.log('isNotExpired: ', isNotExpired)
          console.log('isIPEqual: ', isIPEqual)
          if (isNotExpired && isIPEqual) {
            foundSession.expiresIn = new Date(+new Date() + Number(process.env.SESSION_DURATION))
            await foundSession.save()
            next()
          } else {
            await Session.deleteOne({ accessToken: token })
            res.status(403).send({message: 'Попытка несанкционированного доступа. Пожалуйста, перезайдите в аккаунт.'})
          }
        } else {
          res.status(403).send({message: 'Пожалуйста, перезайдите в аккаунт. Сессия отсутствует'})
        }
      } else {
        res.status(403).send({message: 'Пожалуйста, перезайдите в аккаунт. Токен отсутсвует'})
      }
    } catch (error) {
      next(error)
    }
  },
}