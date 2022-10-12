const Driver = require('../models/driver') // must be called at least once in app

const greeting = (req, res) => {
    res.send({ hi: 'there'})
} 

const create = (req, res, next) => {
    console.log(req.body)
    const driverProps = req.body
    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch((err) => next(err))
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

// get all drivers within 200 kilometers
/*const index = (req, res, next) => {
  const {lng, lat} = req.query // lng, lat are string here
  Driver.find({
    'geometry.coordinates': {
        $nearSphere: {
            $geometry: {
                type: "Point",
                coordinates: [lng, lat] // parseFloat(lng)
            },
            $maxDistance: 200000
        }
    }
})
    .then(drivers => res.send(drivers))
    .catch(next)
} */
const index = (req, res, next) => {
  const { lng, lat } = req.query;
  Driver.
      aggregate([{
          $geoNear: {
              near: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
              distanceField: "dist.calculated", // required
              maxDistance: 200000,
              spherical: true
          }
      }])
      .then(drivers => {
          res.send(drivers)
      })
      .catch(next);
 }

module.exports =  { greeting, create, edit, deleteDriver, index }


