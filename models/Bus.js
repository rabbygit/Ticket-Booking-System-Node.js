const { Schema, model } = require("mongoose")

const busSchema = new Schema({
    merchant: {
        type: Schema.Types.ObjectId,
        ref: "Merchant",
        required: true
    },
    departureTrip: {
        type: Schema.Types.ObjectId,
        ref: "Trip",
        required: true
    },
    returnTrip: {
        type: Schema.Types.ObjectId,
        ref: "Trip",
        required: true
    },
    busNumber: {
        type: String,
        unique: true,
        required: true
    },
    busName: {
        type: String,
        maxlength: 100
    },
    busLogo: String,
    officeAddress: {
        type: String,
        required: true
    },
    contactNumber: {
        type: [String],
        required: true
    },
    busType: {
        type: String,
        enum: ["AC", "NON AC"]
    },
    totalSeat: Number,
    seatPrice: {
        type: Number,
        required: true
    },
    seats: [
        {
            type: Schema.Types.ObjectId,
            ref: "Seat"
        }
    ]
}, {
    timestamps: true
})

const Bus = model('Bus', busSchema)

module.exports = Bus;