const Transport = require("../../../../../models/Transport")
const Route = require("../../../../../models/Route")
const Trip = require("../../../../../models/Trip")


const checkId = require("../../../../../validators/mongooseId")

// Bus Index
const busIndex = async (req, res, next) => {
    try {
        let transports = await Transport.find()
            .populate({
                path: "departureTrip",
                select: "_id",
                populate: {
                    path: "route",
                    select: "from to"
                }
            })

        res.status(200).json({
            transports
        })
    } catch (error) {
        next(error)
    }
}



// Filter Bus
const filterBus = async (req, res, next) => {

    let query = {}
    let type = req.query.type || ""
    let num = req.query.number | ""
    let from = (req.query.from) || ""
    let to = (req.query.to) || ""

    try {
        if (type != "") {
            query = {
                type
            }
        }

        if (num != "") {
            let contactNumber = "0" + num
            query = {
                ...query,
                contactNumber
            }
        }

        if (from != "" && to != "") {
            from = from.toLowerCase()
            to = to.toLowerCase()
            let routes = await Route.find({ from, to }, "_id")
            let transportsId = await Trip.find({ route: { $in: routes.map(m => m._id) } }, "transport")

            query = {
                ...query,
                _id: { $in: transportsId.map(m => m.transport) }
            }
        }

        let transports = await Transport.find(query)
            .populate({
                path: "departureTrip",
                select: "_id",
                populate: {
                    path: "route",
                    select: "from to"
                }
            })


        res.status(200).json({
            transports
        })
    } catch (error) {
        next(error)
    }
}


// Show Bus
const showBus = async (req, res, next) => {
    const transportId = req.params.id

    try {
        await checkId(transportId)
        let transport = await Transport.findById(transportId)
            .populate({
                path: "departureTrip",
                select: "_id",
                populate: {
                    path: "route",
                    select: "from to"
                }
            })

        if (!transport) {
            let error = new Error("Bus Not Found")
            error.status = 404
            throw error
        }
        res.status(200).json({
            transport
        })
    } catch (error) {
        next(error)
    }
}

// Update Bus
const updateBus = async (req, res, next) => {
    const transportId = req.params.id
    const updateData = req.body.data
    try {
        await checkId(transportId)
        let transport = await Transport.findById(transportId)
        if (!transport) {
            let error = new Error("Bus Not Found")
            error.status = 404
            throw error
        }

        updatedTransport = await Transport.findOneAndUpdate(
            { _id: transportId },
            { $set: updateData },
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


// Delete Bus
const deleteBus = async (req, res, next) => {
    const transportId = req.params.id

    try {
        await checkId(transportId)
        let transport = await Transport.findById(transportId)
        if (!transport) {
            let error = new Error("Bus Not Found")
            error.status = 404
            throw error
        }

        await Transport.findByIdAndDelete(transportId)

        res.status(200).json({
            success: true,
            transport
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    busIndex,
    filterBus,
    showBus,
    updateBus,
    deleteBus
}