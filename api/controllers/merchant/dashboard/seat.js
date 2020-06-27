
// Seat list
const availableSeatList = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const merchant_id = req.query.merchant_id
    const date = Date.now()
    let available_seats

    res.status(200).json({
        available_seats: `${date} available seats`
    })
}


// Filter seat by contact
const filterByContact = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const merchant_id = req.query.merchant_id
    const date = Date.now()
    const contact = req.query.contact
    let available_seats

    res.status(200).json({
        available_seats: `${date} filter available seats`
    })
}


module.exports = {
    availableSeatList,
    filterByContact
}