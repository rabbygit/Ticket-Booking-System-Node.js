const Bus = require("../../../../models/Bus")

const checkId = require("../../../../validators/mongooseId")

// Transports Bus
const transportBus = async (req, res, next) => {

    let itemPerPage = parseInt(req.query.limit) || 50
    let currentPage = parseInt(req.query.currentPage) || 1

    try {
        const transports = await Bus.find()
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
            itemPerPage,
            currentPage,
            transports
        })
    } catch (error) {
        next(error)
    }
}

const transportSearch = async (req, res, next) => {
    let busNumber = req.query.number
    try {
        let transport = await Bus.findOne({ busNumber })
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
    const { updatedData } = req.body

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
        )

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

        let transport = transport = await Bus.findById(transport_id);
        if (!transport) {
            let e = new Error("Transport not found")
            e.status = 404
            throw e
        }

        let deletedTransport = await Bus.findByIdAndDelete(transport_id);

        res.status(200).json({
            success: true,
            deletedTransport
        })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    transportBus,
    transportSearch,
    transportShow,
    transportUpdate,
    transportDelete,
}