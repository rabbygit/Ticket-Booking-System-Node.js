const Bus = require("../../../../models/Bus")
const Payment = require("../../../../models/Payment")
const Merchant = require("../../../../models/Merchant")

const merchants = async (req, res, next) => {
    try {
        const merchantAll = await Merchant.find()
        const busAll = await Bus.find()
        const paymentAll = await Payment.find()
        res.status(200).json({
            merchantAll,
            busAll,
            paymentAll
        })
    } catch (error) {
        next(error)
    }
}

// Count information
const countTotal = async (req, res, next) => {
    const merchant_id = req.params.id
    const dashboard_data = {
        total_bus: "",
        success_payments: "",
        total_sales_ticket: "",
        total_cancel_ticket: "",
        total_booking_request: "",
        total_today_bus: "",
        total_today_booked: "",
        today_available_seat: ""
    }

    try {
        dashboard_data.total_bus = await Bus.countDocuments({ merchant: merchant_id })
        dashboard_data.success_payments = await Payment.countDocuments({ merchant: merchant_id })
            .populate({
                path: "Bus"
            })

        res.status(200).json({
            dashboard_data
        })
    } catch (error) {
        next(error)
    }
}




module.exports = {
    merchants,
    countTotal
}