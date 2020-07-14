const Ticket = require("../../../../models/Ticket")
const Trip = require("../../../../models/Trip")
const Transport = require("../../../../models/Transport")

const checkId = require("../../../../validators/mongooseId")

// Cancel Ticket List
const cancelTicketIndex = async (req, res, next) => {

    try {
        const canceled_tickets = await Ticket.find({
            "customerPayment.status": "canceled"
        })
            .populate("customer", "name phoneNumber")
            .populate({
                path: "transport",
                select: "number name type seatPrice",
            })
            .populate({
                path: "trip",
                select: "departureTime arrivalTime"
            })
            .populate("route", "from to")
            .populate("seat", "row col")
            .exec()

        res.status(200).json({
            canceled_tickets
        })
    } catch (error) {
        next(error)
    }
}

// Cancel Ticket Filter by Date
const cancelTicketFilterByDate = async (req, res, next) => {

    const transport_number = req.query.number || ""
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
            let date = searchDate.getDate()

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
        if (transport_number != "") {
            let transports = await Transport.findOne({ number: transport_number }, "_id").exec()
            query = {
                ...query,
                transport: transports._id
            }
        }

        let cancel_ticket = await Ticket.find(query)
            .populate("customer", "name phoneNumber")
            .populate({
                path: "transport",
                select: "number name type seatPrice",
            })
            .populate({
                path: "trip",
                select: "departureTime arrivalTime"
            })
            .populate({
                path: "route",
                select: "from to"
            })
            .populate("seat", "row col")

        res.status(200).json({
            cancel_ticket
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

        const ticket = await Ticket.findById(ticket_id)
            .populate("customer", "name phoneNumber")
            .populate({
                path: "transport",
                select: "number name type seatPrice",
            })
            .populate({
                path: "trip",
                select: "departureTime arrivalTime"
            })
            .populate("route", "from to")
            .populate("seat", "row col")
            .exec()

        if (!ticket) {
            let error = new Error("Ticket Not Found")
            error.status = 404
            throw error
        }

        res.status(200).json({
            ticket
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