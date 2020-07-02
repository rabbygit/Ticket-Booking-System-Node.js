const Route = require('../../../../../models/Route')
const Bus = require('../../../../../models/Bus')
const Trip = require('../../../../../models/Trip')

// Available Seat List
const availableSeats = async (req, res, next) => {
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

        let available_seats = await Bus.find({
            departureTrip: { $in: todayTrips.map(trip => trip._id) },
            availableSeats: { $gt: 0 }
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
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)

        res.status(200).json({
            available_seats
        })
    } catch (error) {
        next(error)
    }
}


// Filter Available Seat by location or Bus id
const filterAvailableSeat = async (req, res, next) => {
    const itemPerPage = parseInt(req.query.limit) || 50
    const currentPage = parseInt(req.query.currentPage) || 1


    let searchDate = new Date()
    let year = searchDate.getFullYear()
    let month = searchDate.getMonth();
    let date = searchDate.getDate() + 1

    let busId = req.query.id || ""
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
        if (busId != "") {
            query = {
                ...query,
                busNumber: busId
            }
        }

        let available_seats = await Bus.find(
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