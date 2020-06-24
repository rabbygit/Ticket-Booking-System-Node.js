const Bus = require("../../../../models/Bus")
const Customer = require("../../../../models/Customer")
const Ticket = require("../../../../models/Ticket")

const dashboardIndex = async (req, res, next) => {
    const dashboard_data = {
        total_bus: "",
        total_customer: "",
        total_ticket_sale: "",
        total_ticket_cancle: "",
        total_booking_request: "",
        total_success_payment: ""
    }

    try {
        dashboard_data.total_bus = await Bus.estimatedDocumentCount()
        dashboard_data.total_customer = await Customer.estimatedDocumentCount()
        dashboard_data.total_ticket_sale = await Ticket.countDocuments({ "customerPayment.status": "paid" })
        dashboard_data.total_ticket_cancle = await Ticket.countDocuments({ "customerPayment.status": "canceled" })
        dashboard_data.total_success_payment = await Ticket.countDocuments({ "merchantPayment.status": "paid" })
        // total_booking_request will be in next update

        res.status(200).json({
            dashboard_data
        })

    } catch (error) {
        next(error)
    }

}



module.exports = {
    dashboardIndex
}