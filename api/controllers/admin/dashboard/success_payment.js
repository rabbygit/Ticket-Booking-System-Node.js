const Ticket = require("../../../../models/Ticket")
const Merchant = require("../../../../models/Merchant")

const checkId = require("../../../../validators/mongooseId")

// Success Payments Index
const successPaymentsIndex = async (req, res, next) => {
    const itemPerPage = parseInt(req.query.limit) || 50
    const currentPage = parseInt(req.query.currentPage) || 1

    try {
        const successfulPayments = await Ticket.find({
            "merchantPayment.status": "paid"
        })
            .populate({
                path: "bus",
                select: "busName seatPrice",
                populate: {
                    path: "merchant",
                    select: "name"
                }
            })
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)

        res.status(200).json({
            successfulPayments
        })
    } catch (error) {
        next(error)
    }
}


// Success payments limit , filter by date , merchant name
const successPaymentFilter = async (req, res, next) => {
    const itemPerPage = parseInt(req.query.limit) || 50
    const currentPage = parseInt(req.query.currentPage) || 1

    const merchantName = req.query.name || "";
    let merchants = [];
    let year, month, date;
    let query = {
        "merchantPayment.status": "paid"
    };

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
            date = searchDate.getDate() + 1

            query = {
                ...query,
                "merchantPayment.time": { $gte: new Date(year, month, date), $lt: new Date(year, month, date + 1) }
            }
        }

        // Check merchant
        if (merchantName != "") {
            merchants = await Merchant.find({ name: merchantName }, "_id").exec()
            query = {
                ...query,
                merchant: { $in: merchants.map(m => m._id) }
            }
        }

        let successfulPayments = await Ticket.find(query)
            .populate({
                path: "bus",
                select: "busName seatPrice",
                populate: {
                    path: "merchant",
                    select: "name"
                }
            })
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)

        res.status(200).json({
            success_payments_data: itemPerPage + " " + currentPage + " " + "Success payments data",
            successfulPayments
        })

    } catch (error) {
        next(error)
    }
}


// Invoice Show
const successPaymentInvoiceShow = async (req, res, next) => {
    const ticket_id = req.params.id

    try {
        await checkId(ticket_id)
        const invoice = await Ticket.findOne({
            _id: ticket_id
        })
            .populate({
                path: "bus",
                select: "busName seatPrice",
                populate: {
                    path: "merchant",
                    select: "name"
                }
            })

        if (!invoice) {
            let error = new Error("Invoice Not Found")
            error.status = 404
            throw error
        }

        res.status(200).json({
            ticket_id,
            invoice
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    successPaymentsIndex,
    successPaymentFilter,
    successPaymentInvoiceShow
}