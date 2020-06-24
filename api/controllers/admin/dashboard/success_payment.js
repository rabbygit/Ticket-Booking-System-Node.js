const Ticket = require("../../../../models/Ticket")

const checkId = require("../../../../validators/mongooseId")

// Success Payments Index
const successPaymentsIndex = async (req, res, next) => {
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

        res.status(200).json({
            successfulPayments
        })
    } catch (error) {
        next(error)
    }
}


// Success payments limit
const limitSuccessPayments = async (req, res, next) => {
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
            success_payments_data: itemPerPage + " " + currentPage + " " + "Success payments data",
            successfulPayments
        })

    } catch (error) {
        next(error)
    }
}

// Filter Sucess Payments
const successPaymentFilter = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const data = req.body.data + ' ' + limit + ' ' + currentPage

    res.status(200).json({
        data
    })
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

        // if (!invoice) {
        //     let error = new Error("Invoice Not Found")
        //     error.status = 404
        //     throw error
        // }

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
    limitSuccessPayments,
    successPaymentFilter,
    successPaymentInvoiceShow
}