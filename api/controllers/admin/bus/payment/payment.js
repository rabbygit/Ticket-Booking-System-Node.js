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

    let { status } = req.params

    try {
        status = status.toLowerCase()
        let payments = await Ticket.find({ "merchantPayment.status": status })
            .populate("transport", "number name seatPrice")
            .populate("merchant", "name companyName phoneNumber address")
            .populate("seat", "row col")
            .populate("trip", "departureTime")
            .populate("route", "from to")

        res.status(200).json({
            payments
        })
    } catch (error) {
        next(error)
    }
}

// Filter Payment
const filterPayment = async (req, res, next) => {

    let { status } = req.params
    let { name = '' } = req.query
    let year, month, date;

    status = status.toLowerCase()
    let query = {
        "merchantPayment.status": status
    }

    try {
        // Check Date
        if (req.query.date != "" && (typeof (req.query.date) != "undefined")) {
            if (isNaN(Date.parse(req.query.date))) {
                let e = new Error()
                e.status = 400
                throw e
            }

            let searchDate = new Date(req.query.date)
            year = searchDate.getFullYear()
            month = searchDate.getMonth()
            date = searchDate.getDate()

            query = {
                ...query,
                "merchantPayment.time": { $gte: new Date(year, month, date), $lt: new Date(year, month, date + 1) }
            }
        }

        if (name != "") {
            let merchantId = await Merchant.find({ name: { $regex: new RegExp(name, "i") } }, "_id")

            query = {
                ...query,
                merchant: { $in: merchantId.map(m => m._id) }
            }
        }

        let payments = await Ticket.find(query)
            .populate({
                path: "transport",
                select: "number name seatPrice"
            })
            .populate("merchant", "name")
            .populate("seat", "row col")
            .populate("trip", "departureTime")
            .populate("route", "from to")

        res.status(200).json({
            payments
        })
    } catch (error) {
        next(error)
    }
}

// View Payment
const viewPayment = async (req, res, next) => {
    let { status, id } = req.params

    try {
        await checkId(id)

        let payment = await Ticket.findOne(
            { _id: id, "merchantPayment.status": status }
        )
            .populate({
                path: "transport",
                select: "number name seatPrice"
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

// View Payment
const invoicePayment = async (req, res, next) => {
    let { status, id } = req.params

    try {
        await checkId(id)

        let payment = await Ticket.findOne(
            { _id: id, "merchantPayment.status": status }
        )
            .populate({
                path: "transport",
                select: "number name seatPrice"
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
const acceptPayment = async (req, res, next) => {
    let { id } = req.params

    try {
        await checkId(id)

        let payment = await Ticket.findOne(
            {
                _id: id,
                "merchantPayment.status": "request",
                "customerPayment.status": "paid"
            }
        ).exec()

        if (!payment) {
            let error = new Error("Payment Not Found")
            error.status = 404
            throw error
        }

        let acceptedPayment = await Ticket.findOneAndUpdate(
            { _id: payment._id, "merchantPayment.status": "request" },
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
const deletePayment = async (req, res, next) => {
    let { id } = req.params

    try {
        await checkId(id)

        let payment = await Ticket.findOne(
            { _id: id, "customerPayment.status": "canceled" },
            "_id"
        )

        if (!payment) {
            let error = new Error("Payment Not Found")
            error.status = 404
            throw error
        }

        await Ticket.findOneAndDelete({ _id: payment._id })

        res.status(200).json({
            success: true,
            deletePayment: payment
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    paymentCount,
    paymentList,
    filterPayment,
    viewPayment,
    invoicePayment,
    acceptPayment,
    deletePayment
}