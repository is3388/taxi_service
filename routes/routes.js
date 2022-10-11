// function takes app

const app = require('../app')
const {greeting, create} = require('../controllers/driverController')

module.exports = (app) => {
// watch for incoming requests of method GET
// to the route http://localhost:5000/api
// run the callback function
app.get('/api', greeting)
app.post('/api/drivers', create)
}


