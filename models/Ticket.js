const { Schema, model } = require("mongoose")

const ticketSchema = new Schema({
    payment: {
        type: Schema.Types.ObjectId,
        ref: "Payment",
        required: true
    },
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
    seat: {
        type: Schema.Types.ObjectId,
        ref: "Seat",
        required: true
    },
    customerPaymentStatus: {
        type: String,
        enum: ["paid", "processing", "canceled", "unpaid"],
        default: "unpaid"
    },
    merchantPaymentStatus: {
        type: String,
        enum: ["paid", "processing", "canceled", "unpaid"],
        default: "unpaid"
    }
}, {
    timestamps: true
})

const Ticket = model('Ticket', ticketSchema)

module.exports = Ticket;