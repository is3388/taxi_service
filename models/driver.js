const mongoose = require('mongoose')

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
    }
}, {
    timestamps: true
})

const Driver = mongoose.model('driver', DriverSchema)

module.exports = Driver