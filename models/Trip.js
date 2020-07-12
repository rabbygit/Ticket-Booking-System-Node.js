const { Schema, model } = require("mongoose")

const tripSchema = new Schema({
    transport: {
        type: Schema.Types.ObjectId,
        ref: "Transport",
        required: true
    },
    route: {
        type: Schema.Types.ObjectId,
        ref: "Route",
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    duration: String,
    boardingPoint: [String],
    droppingPoint: [String],
    stoppage: [String]
}, {
    timestamps: true
})

const Trip = model('Trip', tripSchema)

module.exports = Trip;