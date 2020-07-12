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
    merchant: {
        type: Schema.Types.ObjectId,
        ref: "Merchant"
    },
    trip: {
        type: Schema.Types.ObjectId,
        ref: "Trip",
        required: true
    },
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
    seat: {
        type: Schema.Types.ObjectId,
        ref: "Seat",
        required: true
    },
    transportType: {
        type: String
    },
    customerPayment: {
        status: {
            type: String,
            enum: ["paid", "processing", "canceled", "unpaid"]
        },
        time: Date,
        paymentMethod: String
    },
    merchantPayment: {
        status: {
            type: String,
            enum: ["paid", "processing", "canceled", "unpaid", "request"],
            default: "unpaid"
        },
        time: Date,
        paymentMethod: String
    }
}, {
    timestamps: true
})

const Ticket = model('Ticket', ticketSchema)

module.exports = Ticket;