
// Add booking
const addBooking = (req, res) => {
    const merchant_id = req.params.merchant_id
    let message

    res.status(200).json({
        message: `${merchant_id} booking added`
    })
}


// Booking request list
const bookingRequests = (req, res) => {
    const merchant_id = req.params.merchant_id
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const status = req.params.status
    let booking_data

    res.status(200).json({
        booking_data: `${status} booking data`
    })
}


// date filter
const filterByDate = (req, res) => {
    const merchant_id = req.params.merchant_id
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const status = req.params.status
    const date = req.query.date
    let booking_data

    res.status(200).json({
        booking_data: `${date} booking data`
    })
}


// filter by phone
const filterByPhone = (req, res) => {
    const merchant_id = req.params.merchant_id
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const status = req.params.status
    const phone = req.query.phone
    let booking_data

    res.status(200).json({
        booking_data: `${phone} phone booking data`
    })
}


// View booking
const viewBooking = (req, res) => {
    const merchant_id = req.params.merchant_id
    const booking_id = req.params.booking_id
    let booking_info

    res.status(200).json({
        booking_info: `${booking_id} information`
    })
}


// Cancel booking
const cancelBooking = (req, res) => {
    const merchant_id = req.params.merchant_id
    const booking_id = req.params.booking_id
    let message

    res.status(200).json({
        message: `${booking_id} cancel ticket`
    })
}


module.exports = {
    addBooking,
    bookingRequests,
    filterByDate,
    filterByPhone,
    viewBooking,
    cancelBooking
}