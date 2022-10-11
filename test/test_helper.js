const mongoose = require('mongoose')

// prevent mocha to execute all tests before connection made
// put the code here instead of in app.js
before(done => {
    mongoose.connect('mongodb://127.0.0.1:27017/taxi_service_test')
    mongoose.connection
      .once('open', () => 
        done())
      .on('error', err => {
        console.warn('Warning', err)
      })
})

beforeEach(done => {
    const { drivers } = mongoose.connection.collections
    drivers.drop()
      .then(() => done())
      .catch(() => done()) // to handle the error when the code the first time that no drivers collection exists
})