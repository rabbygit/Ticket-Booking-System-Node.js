

// Success Payments Index
const successPaymentsIndex = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const payments_data = limit + " " + currentPage + " " + "Success payments data"

    res.status(200).json({
        success_payments_data: payments_data
    })
}


// Success payments limit
const limitSuccessPayments = (req, res) => {
    const limit = req.params.limit
    const payments_data = limit + "Payments select"

    res.status(200).json({
        success_payments_data: payments_data
    })
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
const successPaymentInvoiceShow = (req, res) => {
    const payment_id = req.params.id

    res.status(200).json({
        payment_id
    })
}


module.exports = {
    successPaymentsIndex,
    limitSuccessPayments,
    successPaymentFilter,
    successPaymentInvoiceShow
}