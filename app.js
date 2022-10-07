// solely for testing the server
// separate this file with index.js
// nice to not have the server automatically try to listen to an outside port
const express = require('express')
const routes = require('./routes/routes')

// create an object that takes http requests
// depending on the request type/method and route
// run some logic inside the app
const app = express() 

routes(app)

module.exports = app