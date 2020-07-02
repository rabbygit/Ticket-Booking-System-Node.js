const Route = require('../../../../../models/Route')
const Bus = require('../../../../../models/Bus')
const Trip = require('../../../../../models/Trip')

const checkId = require("../../../../../validators/mongooseId")

// Bus List
const busList = async (req, res, next) => {
    const itemPerPage = parseInt(req.query.limit) || 50
    const currentPage = parseInt(req.query.currentPage) || 1

    let searchDate = new Date()
    let year = searchDate.getFullYear()
    let month = searchDate.getMonth();
    let date = searchDate.getDate() + 1

    try {
        let todayTrips = await Trip.find(
            {
                departureTime: { $gte: new Date(year, month, date), $lt: new Date(year, month, date + 1) }
            },
            "_id"
        ).exec()

        let today_buses = await Bus.find(
            { departureTrip: { $in: todayTrips.map(trip => trip._id) } },
            "busNumber contactNumber busType availableSeats seatPrice"
        )
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
            today_buses
        })
    } catch (error) {
        next(error)
    }
}


// Filter bus
const filterBus = async (req, res, next) => {
    const itemPerPage = parseInt(req.query.limit) || 50
    const currentPage = parseInt(req.query.currentPage) || 1

    let searchDate = new Date()
    let year = searchDate.getFullYear()
    let month = searchDate.getMonth();
    let date = searchDate.getDate() + 1

    let busId = req.query.id || ""
    let contactNumber = req.query.number || ""
    let from = (req.query.from) || ""
    let to = (req.query.to) || ""

    try {
        // Today Buses
        let todayTrips = await Trip.find(
            {
                departureTime: { $gte: new Date(year, month, date), $lt: new Date(year, month, date + 1) }
            },
            "_id"
        ).exec()

        let query = {
            departureTrip: { $in: todayTrips.map(trip => trip._id) }
        }

        // Query by route
        if (from != "" && to != "") {
            from = from.toLowerCase()
            to = to.toLowerCase()
            let routes = await Route.find({ from, to }, "_id")
            let buses = await Trip.find({ route: { $in: routes.map(m => m._id) } }, "bus")

            query = {
                ...query,
                _id: { $in: buses.map(m => m.bus) }
            }
        }

        // Query by bus id
        if (busId != "") {
            query = {
                ...query,
                busNumber: busId
            }
        }

        // Query by contact number
        if (contactNumber != "") {
            query = {
                ...query,
                contactNumber
            }
        }

        let today_buses = await Bus.find(
            query,
            "busNumber contactNumber busType availableSeats seatPrice"
        )
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
            today_buses
        })
    } catch (error) {
        next(error)
    }
}


// Show Bus
const showBus = async (req, res, next) => {
    const bus_id = req.params.id

    let searchDate = new Date()
    let year = searchDate.getFullYear()
    let month = searchDate.getMonth();
    let date = searchDate.getDate() + 1

    try {
        await checkId(bus_id)

        let todayTrips = await Trip.find(
            {
                departureTime: { $gte: new Date(year, month, date), $lt: new Date(year, month, date + 1) }
            },
            "_id"
        ).exec()

        let bus = await Bus.findOne(
            {
                departureTrip: { $in: todayTrips.map(trip => trip._id) },
                _id: bus_id
            },
            "busNumber contactNumber busType availableSeats seatPrice"
        )
            .populate({
                path: "departureTrip",
                select: "_id",
                populate: {
                    path: "route",
                    select: "from to"
                }
            })

        if (!bus) {
            let error = new Error("Bus Not Found")
            error.status = 404
            throw error
        }

        res.status(200).json({
            bus
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    busList,
    filterBus,
    showBus
}