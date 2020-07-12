const Route = require('../../../../../models/Route')
const Transport = require('../../../../../models/Transport')
const Trip = require('../../../../../models/Trip')

const checkId = require("../../../../../validators/mongooseId")

// Bus List
const busList = async (req, res, next) => {

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

        let today_buses = await Transport.find(
            { departureTrip: { $in: todayTrips.map(trip => trip._id) } },
            "number number type availableSeats seatPrice"
        )
            .populate({
                path: "departureTrip",
                select: "_id",
                populate: {
                    path: "route",
                    select: "from to"
                }
            })


        res.status(200).json({
            today_buses
        })
    } catch (error) {
        next(error)
    }
}


// Filter bus
const filterBus = async (req, res, next) => {

    let searchDate = new Date()
    let year = searchDate.getFullYear()
    let month = searchDate.getMonth();
    let date = searchDate.getDate() + 1

    let transportId = req.query.id || ""
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
            let buses = await Trip.find({ route: { $in: routes.map(m => m._id) } }, "transport")

            query = {
                ...query,
                _id: { $in: buses.map(m => m.bus) }
            }
        }

        // Query by bus id
        if (transportId != "") {
            query = {
                ...query,
                number: transportId
            }
        }

        // Query by contact number
        if (contactNumber != "") {
            query = {
                ...query,
                contactNumber
            }
        }

        let today_buses = await Transport.find(
            query,
            "number number type availableSeats seatPrice"
        )
            .populate({
                path: "departureTrip",
                select: "_id",
                populate: {
                    path: "route",
                    select: "from to"
                }
            })

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

        let bus = await Transport.findOne(
            {
                departureTrip: { $in: todayTrips.map(trip => trip._id) },
                _id: bus_id
            },
            "number number type availableSeats seatPrice"
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