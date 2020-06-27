
// Booked List & Filter by date
const bookedList = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const date = req.query.date
    const status = req.query.status
    const merchant_id = req.query.merchant_id
    let booked_data

    res.status(200).json({
        booked_data: `${status} booked ticket list`
    })
}


// Filter phone
const filterBooked = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const merchant_id = req.query.merchant_id
    const date = req.query.date
    const phone = req.query.phone
    let booked_data

    res.status(200).json({
        booked_data: `${status} filtered booked ticket list`
    })
}


// View Booked
const viewBooked = (req, res) => {
    const booked_id = req.params.booked_id
    let booked_info

    res.status(200).json({
        booked_info: `${booked_id} booked info`
    })
}


// Update booked
const updateBooked = (req, res) => {
    const booked_id = req.params.booked_id
    const merchant_id = req.query.merchant_id
    const data = req.body.data
    let message

    res.status(200).json({
        message: true
    })
}


// Cancel booked
const cancelBooked = (req, res) => {
    const booked_id = req.params.booked_id
    const merchant_id = req.query.merchant_id
    const status = "cancel"
    let message

    res.status(200).json({
        message: true
    })
}



module.exports = {
    bookedList,
    filterBooked,
    viewBooked,
    updateBooked,
    cancelBooked
}