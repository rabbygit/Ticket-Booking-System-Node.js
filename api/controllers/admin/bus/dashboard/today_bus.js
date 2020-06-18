

// Bus List
const busList = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const date = req.params.date
    let bus

    res.status(200).json({
        bus: `${date} bus list` + ' ' + limit + ' ' + currentPage
    })
}


// Filter bus
const filterBus = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const date = req.params.date
    const data = req.body.data
    let bus

    res.status(200).json({
        bus: `${date} bus list` + ' ' + limit + ' ' + currentPage + ' ' + data
    })
}


// Show Bus
const showBus = (req, res) => {
    const bus_id = req.params.id
    const date = req.params.date
    let bus

    res.status(200).json({
        bus: `${bus_id} bus info` + ' ' + date
    })
}


module.exports = {
    busList,
    filterBus,
    showBus
}