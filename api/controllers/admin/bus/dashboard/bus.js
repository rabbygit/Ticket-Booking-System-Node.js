
// Bus Index
const busIndex = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const bus_data = "Total bus list " + limit + ' ' + currentPage

    res.status(200).json({
        bus_list_data: bus_data
    })
}


// Filter by date
const filterBusByDate = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const date = req.params.date
    const bus_data = "Bus filter by " + date + ' ' + limit + ' ' + currentPage

    res.status(200).json({
        bus_list_data: bus_data
    })
}


// Filter Bus
const filterBus = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const data = req.body.data
    const bus_data = "Bus filter by " + data + ' ' + limit + ' ' + currentPage

    res.status(200).json({
        bus_list_data: bus_data
    })
}


// Show Bus
const showBus = (req, res) => {
    const bus_id = req.params.id
    const bus_type = req.params.type
    const bus_data = "Bus show " + bus_id + ' ' + bus_type

    res.status(200).json({
        bus_info: bus_data
    })
}


// Edit Bus
const editBus = (req, res) => {
    const bus_id = req.params.id
    const bus_type = req.params.type
    const bus_data = "Bus Edit " + bus_id + ' ' + bus_type

    res.status(200).json({
        bus_info: bus_data
    })
}


// Update Bus
const updateBus = (req, res) => {
    const bus_id = req.params.id
    let message

    res.status(200).json({
        message: true
    })
}


// Delete Bus
const deleteBus = (req, res) => {
    const bus_id = req.params.id
    let message

    res.status(200).json({
        message: true
    })
}


module.exports = {
    busIndex,
    filterBusByDate,
    filterBus,
    showBus,
    editBus,
    updateBus,
    deleteBus
}