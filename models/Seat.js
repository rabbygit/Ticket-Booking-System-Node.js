const { Schema, model } = require("mongoose")

const seatSchema = new Schema({
    transport: {
        type: Schema.Types.ObjectId,
        ref: "Transport",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["available", "booked"]
    },
    class: {
        type: String,
        required: true,
        maxlength: 50
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