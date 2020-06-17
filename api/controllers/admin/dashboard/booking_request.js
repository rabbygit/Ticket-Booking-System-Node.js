
// Booking Request List
const bookingRequestIndex = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const booking_requests = "All booking requests " + limit + ' ' + currentPage

    res.status(200).json({
        booking_requests_data: booking_requests
    })
}


// Requests Filter
const bookingRequestFilter = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const data = req.body.data

    const booking_requests = "Filtered booking requests " + limit+ " "+ currentPage

    res.status(200).json({
        booking_requests_data: booking_requests
    })
}


// Request Show
const bookingRequestShow = (req, res) => {
    const booking_request_id = req.params.id

    const booking_request = "Booking request show " + booking_request_id

    res.status(200).json({
        booking_request_data: booking_request
    })
}


// Request Edit
const bookingRequestEdit = (req, res) => {
    const booking_request_id = req.params.id

    const booking_request = "Booking request edit " + booking_request_id

    res.status(200).json({
        booking_request_data: booking_request
    })
}


// Request Update
const bookingRequestUpdate = (req, res) => {
    const booking_request_id = req.params.id
    const booking_request_new_data = {
        customer_name: req.body.customer_name
    }

    res.status(200).json({
        message: true
    })
}


// Request Paid
const bookingRequestPaid = (req, res) => {
    const booking_request_id = req.params.id
    let message

    res.status(200).json({
        message: true
    })
}


// Request Delete
const bookingRequestDelete = (req, res) => {
    const booking_request_id = req.params.id
    let message

    res.status(200).json({
        message: true
    })
}



module.exports = {
    bookingRequestIndex,
    bookingRequestFilter,
    bookingRequestShow,
    bookingRequestEdit,
    bookingRequestUpdate,
    bookingRequestPaid,
    bookingRequestDelete
}