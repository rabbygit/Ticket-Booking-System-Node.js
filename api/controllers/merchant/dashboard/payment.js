
// payment list
const paymentList = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const payment_status = req.query.status
    let payments

    res.status(200).json({
        payments: `${payment_status} Success payment lists`
    })
}


// limit bus select
const limitPaymentSelect = (req, res) => {
    const limit = req.query.limit
    const payment_status = req.query.status
    let payments

    res.status(200).json({
        payments: `${payment_status} Success payment lists`
    })
}


// Filter payment
const filterPayment = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const payment_status = req.query.status
    const transport_id = req.query.transport_id
    let payments

    res.status(200).json({
        payments: `${transport_id} filter payments`
    })
}


// Invoice
const paymentInvoice = (req, res) => {
    const payment_id = req.params.payment_id
    let payment_info

    res.status(200).json({
        payment_info: `${payment_id} invoice`
    })
}




module.exports = {
    paymentList,
    limitPaymentSelect,
    filterPayment,
    paymentInvoice
}