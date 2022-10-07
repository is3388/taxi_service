const mongoose = require('mongoose')

const DriverSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        require: true,
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

export default Driver