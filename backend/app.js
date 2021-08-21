const express = require('express')
const config = require('./utils/config')
require('express-async-errors')
const app = express()
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const courtRouter = require('./controllers/courts')
const middleware = require('./utils/middleware')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/courts',courtRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app