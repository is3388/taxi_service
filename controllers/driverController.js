const Driver = require('../models/driver') // must be called at least once in app

const greeting = (req, res) => {
    res.send({ hi: 'there'})
} 

const create = (req, res, next) => {
    console.log(req.body)
    const driverProps = req.body
    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next)
    }

module.exports =  { greeting, create }


