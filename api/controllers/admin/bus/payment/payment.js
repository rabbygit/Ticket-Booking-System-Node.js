
// Payment Count
const paymentCount = (req, res) => {
    const payment_requests = "Payment requests"
    const processing_payments = "processing Payment"
    const success_payments = "Success Payment"
    const cancel_payments = "Cancel Payment"

    res.status(200).json({
        payment_requests,
        processing_payments,
        success_payments,
        cancel_payments
    })
}


// Payment List
const paymentList = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const payment_status = req.query.status
    const payments = `${payment_status} payments`

    res.status(200).json({
        payments_data: payments
    })
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