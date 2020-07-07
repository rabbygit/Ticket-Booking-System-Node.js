const Ticket = require("../../../../../models/Ticket")

// Payment Count
const paymentCount = async (req, res, next) => {
    let data = {}

    try {
        data.payment_requests = await Ticket.countDocuments({ "merchantPayment.status": "request" })
        data.processing_payments = await Ticket.countDocuments({ "merchantPayment.status": "processing" })
        data.success_payments = await Ticket.countDocuments({ "merchantPayment.status": "paid" })
        data.cancel_payments = await Ticket.countDocuments({ "merchantPayment.status": "canceled" })

        res.status(200).json({ data })
    } catch (error) {
        next(error)
    }
}


// Payment List
const paymentList = async (req, res, next) => {
    const itemPerPage = parseInt(req.query.limit) || 50
    const currentPage = parseInt(req.query.currentPage) || 1

    const { status } = req.params

    try {
        let payments = await Ticket.find(
            { "merchantPayment.status": status },
            "_id"
        )
            .populate({
                path: "bus",
                select: "busNumber busName seatPrice"
            })
            .populate("merchant", "name")
            .populate("seat", "row col")
            .populate("trip", "departureTime")
            .populate("route", "from to")
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)

        res.status(200).json({
            payments
        })
    } catch (error) {
        next(error)
    }
}


// Payment Limit
const limitPayment = (req, res) => {
    const limit = req.query.limit
    const payment_status = req.query.status
    const payments = `${payment_status} payments`

    res.status(200).json({
        payments_data: payments
    })
}


// Filter Payment
const filterPayment = (req, res) => {
    const transport_id = req.query.transport_id
    const travel_road = req.query.travel_road
    const payments = `${payment_status} payments`

    res.status(200).json({
        payments_data: payments
    })
}


// View Payment
const viewPayment = (req, res) => {
    const payment_id = req.params.id
    const payment_info = `${payment_id} payment info`

    res.status(200).json({
        payment_info
    })
}


// Payment transaction status
const paymentTransactionStatus = (req, res) => {
    const payment_id = req.params.id
    const transaction_status = req.body.transaction_status
    let message

    res.status(200).json({
        message: true
    })
}


// Delete payment
const deletePayment = (req, res) => {
    const payment_id = req.params.id
    let message

    res.status(200).json({
        message: true
    })
}


module.exports = {
    paymentCount,
    paymentList,
    limitPayment,
    filterPayment,
    viewPayment,
    paymentTransactionStatus,
    deletePayment
}