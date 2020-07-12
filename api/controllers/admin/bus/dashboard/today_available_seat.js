const Route = require('../../../../../models/Route')
const Transport = require('../../../../../models/Transport')
const Trip = require('../../../../../models/Trip')

// Available Seat List
const availableSeats = async (req, res, next) => {

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

        let available_seats = await Transport.find({
            departureTrip: { $in: todayTrips.map(trip => trip._id) },
            availableSeats: { $gt: 0 }
        },
            "number contactNumber availableSeats seatPrice type")
            .populate({
                path: "departureTrip",
                select: "_id",
                populate: {
                    path: "route",
                    select: "from to"
                }
            })

        res.status(200).json({
            available_seats
        })
    } catch (error) {
        next(error)
    }
}


// Filter Available Seat by location or Bus id
const filterAvailableSeat = async (req, res, next) => {
    // "2020-06-26"
    let searchDate = new Date()
    let year = searchDate.getFullYear()
    let month = searchDate.getMonth();
    let date = searchDate.getDate() + 1

    let transportId = req.query.id || ""
    let from = (req.query.from) || ""
    let to = (req.query.to) || ""

    try {
        let todayTrips = await Trip.find(
            {
                departureTime: { $gte: new Date(year, month, date), $lt: new Date(year, month, date + 1) }
            },
            "_id"
        ).exec()

        let query = {
            departureTrip: { $in: todayTrips.map(trip => trip._id) },
            availableSeats: { $gt: 0 }
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
        if (transportId != "") {
            query = {
                ...query,
                number: transportId
            }
        }

        let available_seats = await Transport.find(
            query,
            "number contactNumber type availableSeats seatPrice"
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
            available_seats
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    availableSeats,
    filterAvailableSeat
}