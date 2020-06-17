

// Transports index 
const transportIndex = (req, res) => {
    const limit = req.query.limit;
    const currentPage = req.query.currentPage;
    const transports = "transports index " + limit + ' ' + currentPage;

    res.status(200).json({
        transports_data: transports
    })
}


// Transport show
const transportShow = (req, res) => {
    const transport_id = req.params.id
    const transport_type = req.params.type

    res.status(200).json({
        transport_data: transport_id + ' ' + transport_type
    })
}


// Transport edit
const transportEdit = (req, res) => {
    const transport_id = req.params.id
    const transport_type = req.params.type

    res.status(200).json({
        transport_data: transport_id + ' ' + transport_type
    })
}


// Transport update
const transportUpdate = (req, res) => {
    const transport_id = req.params.id
    const transport_type = req.params.type

    res.status(200).json({
        transport_data: transport_id + "transport updated" + ' ' + transport_type
    })
}


// Transport delete
const transportDelete = (req, res) => {
    const transport_id = req.params.id
    const transport_type = req.params.type

    res.status(200).json({
        transport_data: transport_id + "transport deleted" + ' ' + transport_type
    })
}


// Filter by date
const filterByDate = (req, res) => {
    const date = req.body.date
    const limit = req.query.limit
    const currentPage = req.query.currentPage

    res.status(200).json({
        transport_data: date + "Filter by date" + limit + ' ' + currentPage
    })
}


// Filter Transport 
const filterTransport = (req, res) => {
    const data = req.body.data
    const limit = req.query.limit
    const currentPage = req.query.currentPage


    res.status(200).json({
        transports_data: 'filter  ' + data + ' ' + limit + ' ' + currentPage
    })

}


module.exports = {
    transportIndex,
    transportShow,
    transportEdit,
    transportUpdate,
    transportDelete,
    filterByDate,
    filterTransport
}