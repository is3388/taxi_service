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
            .send({email: 'asmith@test.com'})
            .end(() => {
                Driver.count().then(newCount => {
                assert(count + 1 === newCount)
                done()
            })
        })
         })
        
    })
})