

// booking date
const bookingList = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const booking = "booking " + limit + ' ' + currentPage

    res.status(200).json({
        booking_data: booking
    })
}


// Limit booking select
const limitBooking = (req, res) => {
    const limit = req.params.limit
    const booking = "booking limit " + limit

    res.status(200).json({
        booking_data: booking
    })
}


// Filter booking
const filterBooking = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const data = req.body.data
    const booking = "booking " + limit + ' ' + currentPage + ' ' + data

    res.status(200).json({
        booking_data: booking
    })
}


// View booking
const showBooking = (req, res) => {
    const booking_id = req.params.id
    let booking_info

    res.status(200).json({
        booking_info: booking_id + ' booking info'
    })

}


module.exports = {
    bookingList,
    limitBooking,
    filterBooking,
    showBooking
}