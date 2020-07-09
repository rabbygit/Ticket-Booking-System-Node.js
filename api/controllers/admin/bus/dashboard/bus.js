const Bus = require("../../../../../models/Bus")
const Route = require("../../../../../models/Route")
const Trip = require("../../../../../models/Trip")


const checkId = require("../../../../../validators/mongooseId")

// Bus Index
const busIndex = async (req, res, next) => {
    const itemPerPage = parseInt(req.query.limit) || 50
    const currentPage = parseInt(req.query.currentPage) || 1
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



// Filter Bus
const filterBus = async (req, res, next) => {
    const itemPerPage = parseInt(req.query.limit) || 50
    const currentPage = parseInt(req.query.currentPage) || 1

    let query = {}
    let busType = req.query.type || ""
    let num = req.query.number | ""
    let from = (req.query.from) || ""
    let to = (req.query.to) || ""

    try {
        if (busType != "") {
            query = {
                busType
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
            let busesId = await Trip.find({ route: { $in: routes.map(m => m._id) } }, "bus")

            query = {
                ...query,
                _id: { $in: busesId.map(m => m.bus) }
            }
        }

        let transports = await Bus.find(query)
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


// Show Bus
const showBus = async (req, res, next) => {
    const bus_id = req.params.id

    try {
        await checkId(bus_id)
        let transport = await Bus.findById(bus_id)
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
    const bus_id = req.params.id
    const updateData = req.body.data
    try {
        await checkId(bus_id)
        let transport = await Bus.findById(bus_id)
        if (!transport) {
            let error = new Error("Bus Not Found")
            error.status = 404
            throw error
        }

        updatedTransport = await Bus.findOneAndUpdate(
            { _id: bus_id },
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
    const bus_id = req.params.id

    try {
        await checkId(bus_id)
        let transport = await Bus.findById(bus_id)
        if (!transport) {
            let error = new Error("Bus Not Found")
            error.status = 404
            throw error
        }

        await Bus.findByIdAndDelete(bus_id)

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