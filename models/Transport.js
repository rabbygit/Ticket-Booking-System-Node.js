const { Schema, model } = require("mongoose")

const transportSchema = new Schema({
    transportType: {
        type: String,
        enum: ["bus", "lunch"],
        default: "bus",
        required: true
    },
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
    number: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        maxlength: 100
    },
    logo: String,
    officeAddress: {
        type: String,
        required: true
    },
    contactNumber: {
        type: [String],
        required: true
    },
    type: {
        type: String,
        enum: ["AC", "N/AC"]
    },
    totalSeat: Number,
    availableSeats: Number,
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

const Transport = model('Transport', transportSchema)

module.exports = Transport;