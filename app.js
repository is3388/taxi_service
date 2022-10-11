// solely for testing the server
// separate this file with index.js
// nice to not have the server automatically try to listen to an outside port
const express = require('express')
const routes = require('./routes/routes')
const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'test') {
mongoose.connect('mongodb://127.0.0.1:27017/taxi_service')
}

// create an object that takes http requests
// depending on the request type/method and route
// run some logic inside the app
const app = express() 
// must be called before routes(app)
// app.use(middleware) middleware is function between req and res. app.use - apply it to all routes not app.get/app.post only to particular route
app.use(express.json()); //any incoming request which is in json will be parsed into an object, so can access request.body
app.use(express.urlencoded({ extended: true }))

routes(app)

module.exports = app