// function takes app

const {greeting} = require('../controllers/driverController')

module.exports = (app) => {
// watch for incoming requests of method GET
// to the route http://localhost:5000/api
// run the callback function
app.get('/api', greeting)
}
