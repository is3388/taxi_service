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
        })
         })
        
    })

   /*it('Post to /api/drivers requires an email', (done) => {
        request(app)
          .post('/api/drivers')
          .send({})
          .end((err, res) => {
            assert(res.error === err.message)
            done()
          })
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
})