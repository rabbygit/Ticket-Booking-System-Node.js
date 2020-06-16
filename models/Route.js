const { Schema, model } = require("mongoose")

const routeSchema = new Schema({
    from: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    to: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    distance: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const Route = model('Route', routeSchema)

module.exports = Route;