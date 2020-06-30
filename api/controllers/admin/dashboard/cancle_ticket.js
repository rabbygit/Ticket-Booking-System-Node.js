const Ticket = require("../../../../models/Ticket")
const Trip = require("../../../../models/Trip")

const checkId = require("../../../../validators/mongooseId")

// Cancel Ticket List
const cancelTicketIndex = async (req, res, next) => {
    const itemPerPage = parseInt(req.query.limit) || 50
    const currentPage = parseInt(req.query.currentPage) || 1

    try {
        const canceled_tickets = await Ticket.find({
            "customerPayment.status": "canceled"
        })
            .populate("customer", "name phoneNumber")
            .populate({
                path: "bus",
                select: "busNumber busName busType seatPrice",
            })
            .populate({
                path: "trip",
                select: "departureTime arrivalTime",
                populate: {
                    path: "route",
                    select: "from to"
                }
            })
            .populate("seat", "row col")
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)

        res.status(200).json({
            canceled_tickets,
            itemPerPage,
            currentPage
        })
    } catch (error) {
        next(error)
    }
}

// Cancel Ticket Filter by Date
const cancelTicketFilterByDate = async (req, res, next) => {
    const itemPerPage = parseInt(req.query.limit) || 50
    const currentPage = parseInt(req.query.currentPage) || 1
    const transport_id = req.query.id || ""
    let specificTrips = [];
    let query = {
        "customerPayment.status": "canceled"
    };

    try {
        // Check valid date 
        if ((typeof (req.query.date)) != "undefined" && req.query.date != "") {
            if (isNaN(Date.parse(req.query.date))) {
                let e = new Error()
                e.status = 400
                throw e
            }

            let searchDate = new Date(req.query.date)
            let year = searchDate.getFullYear()
            let month = searchDate.getMonth()
            let date = searchDate.getDate() + 1

            specificTrips = await Trip.find(
                {
                    departureTime: { $gte: new Date(year, month, date), $lt: new Date(year, month, date + 1) }
                },
                "_id"
            )
                .exec()

            query = {
                ...query,
                trip: { $in: specificTrips.map(trip => trip._id) }
            }
        }

        // check valid transport id
        if (transport_id != "") {
            await checkId(transport_id)
            query = {
                ...query,
                bus: transport_id
            }
        }

        let sales_ticket = await Ticket.find(query)
            .populate("customer", "name phoneNumber")
            .populate({
                path: "bus",
                select: "busNumber busName busType seatPrice",
            })
            .populate({
                path: "trip",
                select: "departureTime arrivalTime",
                populate: {
                    path: "route",
                    select: "from to"
                }
            })
            .populate("seat", "row col")
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)

        res.status(200).json({
            sales_ticket,
            itemPerPage,
            currentPage
        })
    } catch (error) {
        next(error)
    }
}


// Ticket View
const cancelTicketShow = async (req, res, next) => {
    const ticket_id = req.params.id

    try {
        await checkId(ticket_id)

        const canceled_ticket = await Ticket.findById(ticket_id)
            .populate("customer", "name phoneNumber")
            .populate({
                path: "bus",
                select: "busNumber busName busType seatPrice",
                populate: {
                    path: "departureTrip",
                    select: "departureTime arrivalTime",
                    populate: {
                        path: "route",
                        select: "from to"
                    }
                }
            })
            .populate("seat", "row col")
            .exec()

        if (!canceled_ticket) {
            let error = new Error("Ticket Not Found")
            error.status = 404
            throw error
        }

        res.status(200).json({
            canceled_ticket,
            ticket_id
        })
    } catch (error) {
        next(error)
    }
}



module.exports = {
    cancelTicketIndex,
    cancelTicketFilterByDate,
    cancelTicketShow
}