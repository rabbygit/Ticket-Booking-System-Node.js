

// Today booked list & date filter
const bookedList = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const date = req.params.date
    const status = "booked"
    let bus

    res.status(200).json({
        bus: `${date} ${status} bus list limit ${limit} current page ${currentPage}`
    })
}

// Filter today bus
const filterBookedList = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const date = Date.now()
    const status = "booked"
    const data = req.body.data
    let bus

    res.status(200).json({
        bus: `${data} ${date} ${status} bus filter limit ${limit} current page ${currentPage}`
    })
}

// Show Bus
const showBus = (req, res) => {
    const bus_id = req.params.id
    let bus

    res.status(200).json({
        bus: `${bus_id} bus info`
    })
}

// Edit Bus
const editBus = (req, res) => {
    const bus_id = req.params.id
    let bus

    res.status(200).json({
        bus: `${bus_id} edit bus info`
    })
}

// Update Bus
const updateBus = (req, res) => {
    const bus_id = req.params.id
    const data = req.body.data
    let message

    res.status(200).json({
        message: true
    })
}

// Cancel Booking
const cancelBooking = (req, res) => {
    const bus_id = req.params.id
    const status = "cancel"
    let message

    res.status(200).json({
        message: true
    })
}


module.exports = {
    bookedList,
    filterBookedList,
    showBus,
    editBus,
    updateBus,
    cancelBooking
}