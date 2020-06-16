

// Success Payments Index
const successPaymentsIndex = (req, res) => {
    const limit = req.params.limit
    const payments_data = limit + " " + "Success payments data"

    res.status(200).json({
        success_payments_data: payments_data
    })
}


// Filter Payment by Transport ID || Transport Name || Date & Time || Payment Method || Amount
const successPaymentFilter = (req, res) => {
    const data = req.body.filterdata

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
    successPaymentFilter,
    successPaymentInvoiceShow
}