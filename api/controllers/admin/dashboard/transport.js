const Bus = require("../../../../models/Bus")

const checkId = require("../../../../validators/mongooseId")

// Transports index 
const transportIndex = async (req, res, next) => {

    let itemPerPage = parseInt(req.query.limit) || 50
    let currentPage = parseInt(req.query.currentPage) || 1

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


// Show a single transport for view / edit / search result
const transportShow = async (req, res, next) => {

    const transport_id = req.params.id
    let transport_type = req.params.type || "Bus"


    try {
        // Check valid mongodb id
        await checkId(transport_id)

        let transport = transport = await Bus.findById(transport_id);
        if (!transport) {
            let e = new Error("Transport not found")
            e.status = 404
            throw e
        }

        res.status(200).json({
            transport
        })
    } catch (e) {
        next(e)
    }
}


// Transport update
const transportUpdate = async (req, res, next) => {
    const transport_id = req.params.id
    const transport_type = req.params.type
    const updatedData = req.body
    let transport = null;

    try {
        // Check valid mongodb id
        await checkId(transport_id)

        let transport = transport = await Bus.findById(transport_id);
        if (!transport) {
            let e = new Error("Transport not found")
            e.status = 404
            throw e
        }

        let updatedTransport = await Bus.findOneAndUpdate(
            { _id: transport_id },
            { $set: updatedData },
            { new: true }
        )

        res.status(200).json({
            transport_data: transport_id + "transport updated" + ' ' + transport_type,
            updatedTransport
        })
    } catch (error) {
        next(error)
    }
}


// Transport delete
const transportDelete = async (req, res, next) => {
    const transport_id = req.params.id
    const transport_type = req.params.type

    try {
        await checkId(transport_id)

        let transport = transport = await Bus.findById(transport_id);
        if (!transport) {
            let e = new Error("Transport not found")
            e.status = 404
            throw e
        }

        let deletedTransport = await Bus.findByIdAndDelete(transport_id);

        res.status(200).json({
            transport_data: transport_id + " transport is deleted",
            deletedTransport
        })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    transportIndex,
    transportShow,
    transportUpdate,
    transportDelete,
}