const Customer = require("../../../../../models/Customer")
const Merchant = require("../../../../../models/Merchant")
const Ticket = require("../../../../../models/Ticket")
const Transport = require("../../../../../models/Transport")
const Trip = require("../../../../../models/Trip")
const Seat = require("../../../../../models/Seat")

const dashboardIndex = async (req, res, next) => {
    const data = {
        total_customers: "",
        total_merchant: "",
        total_bus: "",
        total_sales_ticket: "",
        total_cancle_ticket: "",
        booking_requests: "",
        paid_booking: "",
        booked_tickets: "",
        today_booked_buses: "",
        today_buses: "",
        today_available_seats: ""
    }

    try {
        // Get Today Date
        let today = new Date()
        let date = today.getDate()
        let month = today.getMonth()
        let year = today.getFullYear()
        let todayBus = await Trip.find({ departureTime: { $gte: new Date(year, month, date), $lt: new Date(year, month, date + 1) } }, "bus").exec()

        data.total_customers = await Customer.countDocuments({ customerType: "bus" })
        data.total_merchant = await Merchant.countDocuments({ merchantType: "bus" })
        data.total_bus = await Transport.estimatedDocumentCount()
        data.total_sales_ticket = await Ticket.countDocuments({ "customerPayment.status": "paid" })
        data.total_cancle_ticket = await Ticket.countDocuments({ "customerPayment.status": "canceled" })
        data.today_buses = await Trip.countDocuments({ departureTime: { $gte: new Date(year, month, date), $lt: new Date(year, month, date + 1) } })
        data.today_available_seats = await Seat.countDocuments({ status: "available", transport: { $in: todayBus.map(trip => trip.bus) } })

        res.status(200).json({
            data
        })

    } catch (error) {
        next(error)
    }
}



module.exports = {
    dashboardIndex
}