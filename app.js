// solely for testing the server
// separate this file with index.js
// nice to not have the server automatically try to listen to an outside port
const express = require('express')

// create an object that takes http requests
// depending on the request type/method and route
// run some logic inside the app
const app = express() 

// watch for incoming requests of method GET
// to the route http://localhost:5000/api
// run the callback function
app.get('/api', (req, res) => {
    res.send({ hi: 'there'})
})

module.exports = app