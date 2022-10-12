const assert = require('assert')
const request = require('supertest')
const app = require('../../app')
const mongoose = require('mongoose')
const Driver = mongoose.model('driver')

describe('Drivers controller', () => {
    it('Post to /api/drivers creates a new driver', (done) => {
        // get Drivers model count which is 0 before making request
        Driver.count()
         .then((count) => {
            request(app)
            .post('/api/drivers')
            .send({email: 'osmith@test.com'})
            .end(() => {
                Driver.count().then(newCount => {
                assert(count + 1 === newCount)
                done()
            })
          .catch(err => done(err))
        })
         })
       
    })

    it('Get to /api/drivers finds all drivers within 200 kilometers', done => {
      const driver1 = new Driver({email: 'seattle@test.com',
                                  geometry: {
                                    type: 'Point',
                                    coordinates: [-122.4759902,
                                                  47.6147828]
                                  }})
     const driver2 = new Driver({email: 'miami@test.com',
                                  geometry: {
                                    type: 'Point',
                                    coordinates: [-80.253,
                                                  25.791]
                                  }}) 
    Promise.all([driver1.save(), driver2.save()])
      .then(() => {
        request(app)
        .get('/api/drivers?lng=-80&lat=25')
        .end((err, response) => {
          //console.log(response)
          assert(response.body.length === 1)
          assert(response.body[0].email === 'miami@test.com')
          done()
        })
      })
      .catch(err => done(err))
    })

    /*it('Post to /api/drivers requires an email', (done) => {
        request(app)
          .post('/api/drivers')
          .send({})
          .end((err, res) => {
            assert(res.body.error)
            done()
          })
          .catch(err => done(err))

      })*/

    it('Put to /api/drivers/id edits an existing driver', done => {
        const driver = new Driver({email: 'tom@test.com', driving: false})
          driver.save().then(() => {
            request(app)
            .put(`/api/drivers/${driver._id}`)
            .send({ driving: true }) // what you want to edit
            .end(() => {
                Driver.findOne({ email: 'tom@test.com'})
                  .then(driver => {
                    assert(driver.driving === true)
                    done()
                  })
                  .catch(err => done(err))
            })
          })
    })

    it('Delete to /api/drivers/id delete an existing driver', done => {
        const driver = new Driver({email: 'adam@test.com'})
        driver.save()
          .then(() => {
            Driver.findById(driver._id)
            .then(driver => {
            assert(driver.email === 'adam@test.com')
            request(app)
            .delete(`/api/drivers/${driver._id}`)
            .end(() => {
                Driver.findOne({email: 'adam@test.com'})
                .then((driver) => {
                    assert(driver === null) // should not equal to {} empty object
                    done()
                })
                .catch(err => done(err))  
            })
            })
          })
    })
})