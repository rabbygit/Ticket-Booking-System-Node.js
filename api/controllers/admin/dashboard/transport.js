const Bus = require("../../../../models/Bus")
const checkId = require("../../../../validators/mongooseId")

// All Transports 
const allTransports = async (req, res, next) => {

    let itemPerPage = parseInt(req.query.limit) || 50
    let currentPage = parseInt(req.query.currentPage) || 1

    try {
        let transports = await Bus.find()
            .populate({
                path: "departureTrip",
                select: "_id",
                populate: {
                    path: "route",
                    select: "from to"
                }
            })
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)

        res.status(200).json({
            transports,
            itemPerPage,
            currentPage
        })
    } catch (error) {
        next(error)
    }
}

const transportSearch = async (req, res, next) => {
    const itemPerPage = parseInt(req.query.limit) || 50
    const currentPage = parseInt(req.query.currentPage) || 1

    let contactNumber = req.query.number
    try {
        let transports = await Bus.find({ contactNumber })
            .populate({
                path: "departureTrip",
                select: "_id",
                populate: {
                    path: "route",
                    select: "from to"
                }
            })

        if (!transport) {
            let e = new Error("Transport not found")
            e.status = 404
            throw e
        }

        res.status(200).json({
            transports,
            itemPerPage,
            currentPage
        })
    } catch (error) {
        next(error)
    }
}

// Show a single transport for view / edit 
const transportShow = async (req, res, next) => {
    const transport_id = req.params.id

    try {
        // Check valid mongodb id
        await checkId(transport_id)

        let transport = await Bus.findById(transport_id)
            .populate({
                path: "departureTrip",
                select: "_id",
                populate: {
                    path: "route",
                    select: "from to"
                }
            })

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
    const updatedData = req.body.data

    try {
        // Check valid mongodb id
        await checkId(transport_id)

        let transport = await Bus.findById(transport_id);
        if (!transport) {
            let e = new Error("Transport not found")
            e.status = 404
            throw e
        }

        let updatedTransport = await Bus.findOneAndUpdate(
            { _id: transport_id },
            { $set: updatedData },
            { new: true }
        ).exec()

        res.status(200).json({
            success: true,
            updatedTransport
        })
    } catch (error) {
        next(error)
    }
}


// Transport delete
const transportDelete = async (req, res, next) => {
    const transport_id = req.params.id

    try {
        await checkId(transport_id)

        let transport = await Bus.findById(transport_id);
        if (!transport) {
            let e = new Error("Transport not found")
            e.status = 404
            throw e
        }

        await Bus.findByIdAndDelete(transport_id);

        res.status(200).json({
            success: true,
            transport
        })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    allTransports,
    transportSearch,
    transportShow,
    transportUpdate,
    transportDelete,
}