const assert = require('assert')
const app = require('../app')
const request = require('supertest') // lib to make fake http request

describe('The express app', () => {
    it('handle a GET request to /api', (done) => {
        request(app) // supertest syntax
          .get('/api')
          .end((err, response) => {
            console.log(response)
          })
    })
})