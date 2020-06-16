

// Transports index 
const transportIndex = (req, res) => {
    const limit = req.params.limit;
    const transports = "transports index " + limit;

    res.status(200).json({
        transports_data: transports
    })
}


// Transport show
const transportShow = (req, res) => {
    const transport_id = req.params.id

    res.status(200).json({
        transport_data: transport_id
    })
}


// Transport edit
const transportEdit = (req, res) => {
    const transport_id = req.params.id

    res.status(200).json({
        transport_data: transport_id
    })
}


// Transport update
const transportUpdate = (req, res) => {
    const transport_id = req.params.id

    res.status(200).json({
        transport_data: transport_id + "transport updated"
    })
}


// Transport delete
const transportDelete = (req, res) => {
    const transport_id = req.params.id

    res.status(200).json({
        transport_data: transport_id + "transport deleted"
    })
}


// Filter by date
const filterByDate = (req, res) => {
    const date = req.body.date
    const limit = req.body.limit

    res.status(200).json({
        transport_data: date + "Filter by date" + limit
    })
}


// Filter by Transport ID or Location
const filterByTransportIdLocation = (req, res) => {
    const busId = req.body.busid
    const location = req.body.location
    const limit = req.body.limit

    if (busId) {
        res.status(200).json({
            transports_data: 'filter by busid ' + busId + ' ' + limit
        })
    } else if (location) {
        res.status(200).json({
            transports_data: 'filter by location ' + location + ' ' + limit
        })
    }
}


module.exports = {
    transportIndex,
    transportShow,
    transportEdit,
    transportUpdate,
    transportDelete,
    filterByDate,
    filterByTransportIdLocation
}