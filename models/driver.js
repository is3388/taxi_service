const mongoose = require('mongoose')

// embedded subdocument for driver location
const PointSchema = mongoose.Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: { // long and lat (x and y)
        type: [Number],
        index: '2dsphere'
    }
})

const DriverSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        require: [true, 'Email is required'],
        trim: true
    },
    driving: {
        type: Boolean,
        default: false
    },
    geometry: PointSchema
}, {
    timestamps: true
})

const Driver = mongoose.model('driver', DriverSchema)

module.exports = Driver