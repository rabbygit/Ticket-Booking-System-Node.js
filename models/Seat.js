const { Schema, model } = require("mongoose")

const seatSchema = new Schema({
    bus: {
        type: Schema.Types.ObjectId,
        ref: "Bus",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Available", "Booked"]
    },
    class: {
        type: String,
        enum: ["Economy", "Business"]
    },
    row: {
        type: String,
        required: true
    },
    col: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const Seat = model('Seat', seatSchema)

module.exports = Seat;