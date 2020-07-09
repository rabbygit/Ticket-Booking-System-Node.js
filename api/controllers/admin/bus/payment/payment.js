const Ticket = require("../../../../../models/Ticket")
const Merchant = require("../../../../../models/Merchant")

const checkId = require("../../../../../validators/mongooseId")
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

    let { status } = req.params

    try {
        status = status.toLowerCase()
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

// Filter Payment
const searchPayment = async (req, res, next) => {
    const itemPerPage = parseInt(req.query.limit) || 50
    const currentPage = parseInt(req.query.currentPage) || 1

    let { status } = req.params
    let { name = '' } = req.query
    status = status.toLowerCase()
    let query = {
        "merchantPayment.status": status
    }

    try {
        if (name != "") {
            let merchantId = await Merchant.find({ name: { $regex: new RegExp(name, "i") } }, "_id")

            query = {
                ...query,
                merchant: { $in: merchantId.map(m => m._id) }
            }
        }

        let payments = await Ticket.find(query, "_id")
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

3
// View Payment
const viewPayment = async (req, res, next) => {
    let { status, id } = req.params

    try {
        await checkId(id)

        let payment = await Ticket.findOne(
            { _id: id, "merchantPayment.status": status }
        )
            .populate({
                path: "bus",
                select: "busNumber busName seatPrice"
            })
            .populate("merchant", "name")
            .populate("seat", "row col")
            .populate("trip", "departureTime")
            .populate("route", "from to")

        if (!payment) {
            let error = new Error("Payment Not Found")
            error.status = 404
            throw error
        }

        res.status(200).json({
            payment
        })
    } catch (error) {
        next(error)
    }
}


// Change Payment transaction status "request" to "processing"
const paymentTransactionStatus = async (req, res, next) => {
    let { id } = req.params

    try {
        await checkId(id)

        let payment = await Ticket.findOne(
            { _id: id, "merchantPayment.status": "request" }
        ).exec()

        if (!payment) {
            let error = new Error("Payment Not Found")
            error.status = 404
            throw error
        }

        let acceptedPayment = await Ticket.findOneAndUpdate(
            { _id: id, "merchantPayment.status": "request" },
            { $set: { "merchantPayment.status": "processing" } },
            { new: true }
        ).exec()

        res.status(200).json({
            success: true,
            acceptedPayment
        })
    } catch (error) {
        next(error)
    }
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
    searchPayment,
    viewPayment,
    paymentTransactionStatus,
    deletePayment
}