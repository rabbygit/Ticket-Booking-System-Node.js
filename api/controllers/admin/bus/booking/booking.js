
// Booking Count
const bookingCount = (req, res, next) => {
    const booking_requests = "Booking requests"
    const paid_booking = "Paid Booking"
    const booked_ticket = "Booked Tickets"
    const cancel_booking = "Cancel booking"


    res.status(200).json({
        booking_requests, paid_booking, booked_ticket, cancel_booking
    })
}


// Add Booking
const addBooking = (req, res) => {
    let message

    res.status(200).json({
        message: "successfullay bokking added"
    })
}


// Booking List
const bookingList = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const booking_status = req.query.status
    let booking_list = `${booking_status} booking list`

    res.status(200).json({
        booking_list_data: booking_list
    })
}


// Filter Booking
const filterBooking = (req, res) => {
    const transport_id = req.query.transport_id
    const phone = req.query.phone
    const travel_road = req.query.travel_road
    let booking_list = "Filter list data"

    res.status(200).json({
        booking_list_data: booking_list
    })
}


// Limit booking data
const limitBooking = (req, res) => {
    const limit = req.params.limit
    const status = req.params.status
    let booking_list = `${limit} booking data`

    res.status(200).json({
        booking_list_data: booking_list
    })
}


// Show Booking
const showBooking = (req, res) => {
    const booking_id = req.params.id
    const booking_info = `${booking_id} info`

    res.status(200).json({
        booking_info: booking_info
    })
}


// Edit Booking
const editBooking = (req, res) => {
    const booking_id = req.params.id
    const booking_info = `${booking_id} info`

    res.status(200).json({
        booking_info: booking_info
    })
}


// Update booking
const updtaeBooking = (req, res) => {
    const booking_id = req.params.id
    const data = req.body.data
    let message

    res.status(200).json({
        message: true
    })
}


// Status Update
const bookingStatusUpdate = (req, res) => {
    const booking_id = req.params.id
    const data = req.body.data
    let message

    res.status(200).json({
        message: true
    })
}


// delete booking
const deleteBooking = (req, res) => {
    const booking_id = req.params.id
    let message

    res.status(200).json({
        message: true
    })
}




module.exports = {
    bookingCount,
    addBooking,
    bookingList,
    filterBooking,
    limitBooking,
    showBooking,
    editBooking,
    updtaeBooking,
    updtaeBooking,
    bookingStatusUpdate,
    deleteBooking
}