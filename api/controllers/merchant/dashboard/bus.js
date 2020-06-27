

// Add Bus
const addBus = (req, res) => {
    const merchant_id = req.params.merchant_id
    const data = req.body.data
    let message

    res.status(200).json({
        message: `${merchant_id} bus added`
    })
}


// Bus list
const busList = (req, res) => {
    const merchant_id = req.params.merchant_id
    const limit = req.query.id
    const currentPage = req.query.currentPage
    const date = req.query.date
    let busses

    res.status(200).json({
        busses: `${merchant_id} total buses`
    })
}


// Filter by date
const filterByDate = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const date = req.body.date
    const merchant_id = req.params.merchant_id
    let busses

    res.status(200).json({
        busses: `${date} filter by date`
    })
}


// Filter bus
const filterBus = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const bus_id = req.query.bus_id
    const location = req.query.location
    const seat_price = req.query.seat_price
    const merchant_id = req.params.merchant_id
    const date = req.body.date
    let busses

    res.status(200).json({
        busses: "Filter"
    })
}


// View Bus
const showBus = (req, res) => {
    const merchant_id = req.params.merchant_id
    const bus_id = req.params.bus_id
    let bus_info

    res.status(200).json({
        bus_info: `${merchant_id} ${bus_id}`
    })
}


// Update Bus
const updateBus = (req, res) => {
    const merchant_id = req.params.merchant_id
    const bus_id = req.params.bus_id
    const bus_info = req.body.bus_info
    let message

    res.status(200).json({
        message: `${merchant_id} ${bus_id} updated`
    })
}


// Delete Bus
const deleteBus = (req, res) => {
    const merchant_id = req.params.merchant_id
    const bus_id = req.params.bus_id
    let message

    res.status(200).json({
        message: `${merchant_id} ${bus_id} delete`
    })
}



module.exports = {
    addBus,
    busList,
    filterByDate,
    filterBus,
    showBus,
    updateBus,
    deleteBus
}