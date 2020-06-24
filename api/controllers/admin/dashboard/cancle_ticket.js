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


// Cancel Ticket Select by limit
const limitCancelTicket = (req, res) => {
    const limit = req.query.limit
    const cancel_ticket = "Total cancel ticket by " + "Limit" + " " + limit

    res.status(200).json({
        cancel_ticket_data: cancel_ticket
    })
}


// Cancel Ticket Filter by Date
const cancelTicketFilterByDate = (req, res) => {
    const itemPerPage = parseInt(req.query.limit) || 50
    const currentPage = parseInt(req.query.currentPage) || 1
    //const date = req.query.date

    try {
        // Check valid date 
        if (isNaN(Date.parse(req.query.date))) {
            let e = new Error()
            e.status = 400
            throw e
        }

        let searchDate = new Date(req.query.date)
        let year = searchDate.getFullYear()
        let month = searchDate.getMonth() - 1; // As month index starts from zero
        let date = searchDate.getDate()

        let specificTrips = await Trip.find(
            {
                departureTime: { $gte: new Date(year, month, date), $lt: new Date(year, month, date + 1) }
            },
            "_id"
        )
            .exec()

        let canceled_tickets = await Ticket.find({
            trip: { $in: specificTrips.map(trip => trip._id) }
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


// Filter 
const cancelTicketFilter = (req, res) => {
    const data = req.body.data
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const cancel_ticket = "Total cancel ticket filter by " + " " + data + " " + "Limit " + " " + limit + "Current page " + currentPage

    res.status(200).json({
        cancel_ticket_data: cancel_ticket
    })
}


// Ticket View
const cancelTicketShow = (req, res) => {
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
        // if (!canceled_ticket) {
        //     let error = new Error("Customer Not Found")
        //     error.status = 404
        //     throw error
        // }
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
    limitCancelTicket,
    cancelTicketFilterByDate,
    cancelTicketFilter,
    cancelTicketShow
}