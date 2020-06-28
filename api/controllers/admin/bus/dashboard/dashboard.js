const Customer = require("../../../../../models/Customer")
const Merchant = require("../../../../../models/Merchant")
const Ticket = require("../../../../../models/Ticket")
const Bus = require("../../../../../models/Bus")
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
        data.total_customers = await Customer.countDocuments({ customerType: "bus" })
        data.total_merchant = await Merchant.countDocuments({ merchantType: "bus" })
        data.total_bus = await Bus.estimatedDocumentCount()
        data.total_sales_ticket = await Ticket.countDocuments({ "customerPayment.status": "paid" })
        data.total_cancle_ticket = await Ticket.countDocuments({ "customerPayment.status": "canceled" })

        // Get Today Date
        let today = new Date("2020-06-26")
        let date = today.getDate() + 1
        let month = today.getMonth()
        let year = today.getFullYear()

        data.today_buses = await Trip.countDocuments({ departureTime: { $gte: new Date(year, month, date), $lt: new Date(year, month, date + 1) } })

        let todayTrip = await Trip.find({ departureTime: { $gte: new Date(year, month, date), $lt: new Date(year, month, date + 1) } }, "bus").exec()
        let available_seats = await Bus.find({ _id: { $in: todayTrip.map(trip => trip._id) } }, "availableSeats")

        data.today_available_seats = available_seats.map(o => o.availableSeats).reduce((a, c) => { return a + c }, 0);


        res.status(200).json({
            bus_dashboard_data: data
        })
    } catch (error) {
        console.log(error.message)
        next(error)
    }
}



module.exports = {
    dashboardIndex
}