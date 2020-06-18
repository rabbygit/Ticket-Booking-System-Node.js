const Bus = require("../../../../models/Bus")
const Customer = require("../../../../models/Customer")
const Ticket = require("../../../../models/Ticket")

const dashboardIndex = async (req, res, next) => {
    const data = {
        total_bus: "",
        total_customer: "",
        total_ticket_sale: "",
        total_ticket_cancle: "",
        total_booking_request: "",
        total_success_payment: ""
    }

    try {
        data.total_bus = await Bus.estimatedDocumentCount()
        data.total_customer = await Customer.estimatedDocumentCount()
        data.total_ticket_sale = await Ticket.countDocuments({ customerPaymentStatus: "paid" })
        data.total_ticket_cancle = await Ticket.countDocuments({ customerPaymentStatus: "canceled" })
        data.total_success_payment = await Ticket.countDocuments({ merchantPaymentStatus: "paid" })

        // total_booking_request will be in next update

        res.status(200).json({
            dashboard_data: data
        })

    } catch (error) {
        next(error)
    }

}



module.exports = {
    dashboardIndex
}