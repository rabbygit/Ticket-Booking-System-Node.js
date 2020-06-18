const mongoose = require('mongoose')

const Bus = require("../../../../models/Bus")

// Transports index 
<<<<<<< HEAD
const transportIndex = async (req, res, next) => {
=======
const transportIndex = (req, res) => {
    const limit = req.query.limit;
    const currentPage = req.query.currentPage;
    const transports = "transports index " + limit + ' ' + currentPage;
>>>>>>> 38cc0cd5385ea1fa9b92f4389a2a4b1c64bebacb

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
<<<<<<< HEAD
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
=======
    const transport_type = req.params.type

    res.status(200).json({
        transport_data: transport_id + ' ' + transport_type
    })
>>>>>>> 38cc0cd5385ea1fa9b92f4389a2a4b1c64bebacb
}


// Transport edit
const transportEdit = (req, res) => {
    const transport_id = req.params.id
<<<<<<< HEAD
    const { transport_type } = req.params

    let {

    } = req.body
=======
    const transport_type = req.params.type
>>>>>>> 38cc0cd5385ea1fa9b92f4389a2a4b1c64bebacb

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