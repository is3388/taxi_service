// function takes app

const app = require('../app')
const {greeting, create, edit, deleteDriver} = require('../controllers/driverController')

module.exports = (app) => {
// watch for incoming requests of method GET
// to the route http://localhost:5000/api
// run the callback function
app.get('/api', greeting)
app.post('/api/drivers', create)
app.put('/api/drivers/:id', edit)
app.delete('/api/drivers/:id', deleteDriver)

}


