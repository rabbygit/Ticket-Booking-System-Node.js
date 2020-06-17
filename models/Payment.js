const { Schema, model } = require("mongoose")

const paymentSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    trip: {
        type: Schema.Types.ObjectId,
        ref: "Trip",
        required: true
    },
    bus: {
        type: Schema.Types.ObjectId,
        ref: "Bus",
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

const Payment = model('Payment', paymentSchema)

module.exports = Payment;