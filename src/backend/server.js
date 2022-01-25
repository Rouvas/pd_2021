
// common imports
const cors = require('cors')
const http = require('http')
const https = require('https')
const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config()
const app = express()
const webpush = require('web-push');


// Errors handler
const { handleError } = require('./error.js')

// import Routes
const authRoutes = require('./routes/auth.js')
const userRoutes = require('./routes/users.js')
const passRoutes = require('./routes/pass.js')
const departmentRoutes = require('./routes/departments.js')
const pushRoutes = require('./routes/subscription')
const { error } = require('console')
const { adminCheck, jwtCheck, hackCheck, bureauCheck, workerCheck } = require('./common.js')

// web-push-keys
const PUBLIC_VAPID = 'BLFC0iJNYgCAp53NHz_9ArVMpohkABNff6V96lfHqQ2irypqI8xW5CicrfKLRyf_iPVXda4XtWU2mj77T0TAVns';
const PRIVATE_VAPID = '2X9WZucQngPMMN61K9mlSh9R_7UCq-6si-T7PufRYXA';


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
    .then(() => console.log('MongoDB database connected!'))
.catch((err) => console.error('Could not connect to MongoDB...', error, process.env.MONGO_CREDS))

// middlewares
app.use(cors())
app.use(express.json())

webpush.setVapidDetails('http://localhost:8000/', PUBLIC_VAPID, PRIVATE_VAPID);



// Routes middlewares
app.use('/api/auth', authRoutes)
app.use('/api/users', jwtCheck, hackCheck, adminCheck, userRoutes)
app.use('/api/pass', jwtCheck, passRoutes)
app.use('/api/department', jwtCheck, departmentRoutes)
app.use('/api/push', jwtCheck, pushRoutes)
app.use((err, req, res, next) => {
  handleError(err, res)
})

app.route('/').get((req, res) => {
  res.status(200).send('Working successful. Version ' + ver)
})


const port = process.env.PORT || 3500

// const httpServer = http.createServer(app)
// app.listen(port, res => {
//   console.log('PolyPACS backend ver. 0.9 RC1')
//   console.log('Developer for Moscow Polytech')
//   console.log('Backend is running on port: ' + port)
//   console.log('Backend is running on ip: ' + res)
// })

const ver = '0.9 RC1';

app.listen(port, '0.0.0.0' ,() => {
    console.log('PolyPACS backend' + ver)
    console.log('Developed for Moscow Polytech')
    console.log('Backend is running on port: ' + port)
})

// 

