const Ticket = require("../../../../models/Ticket")
const Trip = require("../../../../models/Trip")

const checkId = require("../../../../validators/mongooseId")

// Ticket Sale List
const salesTicketIndex = async (req, res, next) => {
    const itemPerPage = parseInt(req.query.limit) || 50
    const currentPage = parseInt(req.query.currentPage) || 1

    try {
        const sales_ticket = await Ticket.find({
            "customerPayment.status": "paid"
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
            sales_ticket,
            itemPerPage,
            currentPage
        })
    } catch (error) {
        next(error)
    }
}


// Limit Sales Ticket Select
const limitSalesTicketSelect = (req, res) => {
    const limit = req.query.limit
    const sales_ticket = "Total sales ticket by limit" + " " + limit

    res.status(200).json({
        sales_ticket_data: sales_ticket
    })
}


// Filter by date
const filterbyDateSalesTicket = async (req, res, next) => {
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

        let sales_ticket = await Ticket.find({
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
            sales_ticket,
            itemPerPage,
            currentPage
        })
    } catch (error) {
        next(error)
    }
}


// Filter Sales Ticket
const salesTicketFilter = (req, res) => {
    const data = req.body.data
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const sales_ticket = "Total sales ticket filter by " + " " + data + " " + "Limit" + " " + limit + " " + currentPage

    res.status(200).json({
        sales_ticket_data: sales_ticket
    })
}


// Ticket View
const salesTicketShow = async (req, res, next) => {
    const ticket_id = req.params.id

    try {
        await checkId(ticket_id)

        const ticket = await Ticket.findById(ticket_id)
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
        // if (!ticket) {
        //     let error = new Error("Customer Not Found")
        //     error.status = 404
        //     throw error
        // }
        res.status(200).json({
            ticket,
            ticket_id
        })
    } catch (error) {
        next(error)
    }
}



module.exports = {
    salesTicketIndex,
    limitSalesTicketSelect,
    filterbyDateSalesTicket,
    salesTicketFilter,
    salesTicketShow
}