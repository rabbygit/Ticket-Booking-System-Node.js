

// Available Seat List
const availableSeats = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const date = Date.now()
    let available_seats

    res.status(200).json({
        available_seats: `${date} limit ${limit} current page ${currentPage}`
    })
}


// Filter Available Seat
const filterAvailableSeat = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const data = req.body.data
    let available_seats

    res.status(200).json({
        available_seats: `${date} limit ${limit} current page ${currentPage} data ${data}`
    })
}


module.exports = {
    availableSeats,
    filterAvailableSeat
}