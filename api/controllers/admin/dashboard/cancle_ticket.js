
// Cancel Ticket List
const cancelTicketIndex = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const cancel_ticket = "Total cancel ticket" + " " + limit + " " + currentPage

    res.status(200).json({
        cancel_ticket_data: cancel_ticket
    })
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
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const date = req.params.date
    const cancel_ticket = "Total cancel ticket by " + "date" + " " + date + " " + limit + " " + currentPage

    res.status(200).json({
        cancel_ticket_data: cancel_ticket
    })
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
    const cancel_ticket = "cancel ticket " + ticket_id

    res.status(200).json({
        cancel_ticket_data: cancel_ticket
    })
}



module.exports = {
    cancelTicketIndex,
    limitCancelTicket,
    cancelTicketFilterByDate,
    cancelTicketFilter,
    cancelTicketShow
}