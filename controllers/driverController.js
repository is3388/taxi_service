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

const edit = (req, res, next) => {
  const id = req.params.id
  const driverProps = req.body
  Driver.findByIdAndUpdate({_id: id}, driverProps, { new: true })
    .then(driver => res.status(200).send(driver))
    .catch(next)
}

const deleteDriver = (req, res, next) => {
  const id = req.params.id
  Driver.findByIdAndDelete({_id: id})
    .then((driver) => res.status(204).send(driver))
    .catch(next) // .catch((err) => next(err))
}

module.exports =  { greeting, create, edit, deleteDriver }


