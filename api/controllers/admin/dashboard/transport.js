const mongoose = require('mongoose')

const Bus = require("../../../../models/Bus")

// Transports index 
const transportIndex = async (req, res, next) => {

    let itemPerPage = req.query.limit || 50
    let currentPage = req.query.currentPage || 1
    // const limit = req.params.limit;
    // const transports = "transports index " + limit;

    try {
        const transports = await Bus.find()
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)

        res.status(200).json({
            itemPerPage,
            currentPage,
            transports_data: transports
        })
    } catch (error) {
        next(error)
    }
}


// Transport show
const transportShow = async (req, res, next) => {

    const transport_id = req.params.id
    let transport_type = req.query.transport_type || "Bus"
    let transport = null;

    try {
        // Check valid mongodb id
        if (!mongoose.isValidObjectId(transport_id)) {
            let e = new Error()
            e.status = 400
            throw e
        }

        switch (transport_type) {
            case "Bus":
                transport = await Bus.findById(transport_id).exec()
                break;
            //Other switch case for different type of transport
        }

        res.status(200).json({
            transport_data: transport
        })
    } catch (e) {
        console.log(e.message)
        next(e)
    }
}


// Transport edit
const transportEdit = (req, res) => {
    const transport_id = req.params.id
    const { transport_type } = req.params

    let {

    } = req.body

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
const transportDelete = async (req, res, next) => {
    const transport_id = req.params.id
    const transport_type = req.query.type

    try {
        if (!transport_id || !transport_type) {
            let e = new Error()
            e.status = 400
            throw e
        }

        // switch (transport_type) {
        //     case "Bus":
        //         deletedTransport = await Bus.findOneAndDelete({ _id: transport_id })
        //         break;
        // }

        res.status(200).json({
            transport_data: transport_id + "transport deleted"
        })

    } catch (error) {
        console.log(error.message)
        next(error)
    }
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