
// common imports
const cors = require('cors')
const http = require('http')
const https = require('https')
const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config()
const app = express()

// import Routes
const authRoutes = require('./routes/auth.js')
const userRoutes = require('./routes/users.js')
const passRoutes = require('./routes/pass.js')
const { error } = require('console')


// connect to db
mongoose
  .connect(process.env.MONGO_CREDS, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // reconnectTries: Number.MAX_VALUE,
    // reconnectInterval: 500,
    connectTimeoutMS: 10000,
  })
  .then(() => console.log('Connected to MongoDB...'))
.catch((err) => console.error('Could not connect to MongoDB...', error, process.env.MONGO_CREDS))

// middlewares
app.use(cors())
app.use(express.json())


// Routes middlewares
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/pass', passRoutes)

app.route('/').get((req, res) => {
  res.status(200).send('Rouvas gay')
})


const port = process.env.PORT || 3500

// const httpServer = http.createServer(app)
app.listen(port, () => {
  console.log('HTTP Server is running on port: ' + port)
})

// 

