const assert = require('assert')
const app = require('../app')
const request = require('supertest') // lib to make fake http request

describe('The express app', () => {
    it('handle a GET request to /api', (done) => {
        request(app) // supertest syntax
          .get('/api')
          .end((err, response) => {
            //console.log(response)
            assert(response.body.hi === 'there')
            done()
          })
    })
    /* use async await
    it('handles a GET request to /api', async () => {
    const response = await request(app)
    or const response = await axios.get('api');
      .get('/api')
      .expect(200);
      
    assert(response.body.hi === 'there');
    }); */
})