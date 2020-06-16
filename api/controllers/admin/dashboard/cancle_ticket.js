
// Cancel Ticket List
const cancelTicketIndex = (req, res) => {
    const limit = req.params.limit
    const cancel_ticket = "Total cancel ticket" + " " + limit

    res.status(200).json({
        cancel_ticket_data: cancel_ticket
    })
}


// Cancel Ticket Select by Date
const cancelTicketSelectByDate = (req, res) => {
    const date = req.params.date
    const limit = req.params.limit
    const cancel_ticket = "Total cancel ticket by date" + " " + date + " " + "Limit" + " " + limit

    res.status(200).json({
        cancel_ticket_data: cancel_ticket
    })
}


// Filter by phone
const cancelTicketFilter = (req, res) => {
    const phone = req.body.phone
    const limit = req.body.limit
    const cancel_ticket = "Total cancel ticket filter by phone" + " " + phone + " " + "Limit" + " " + limit

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
    cancelTicketSelectByDate,
    cancelTicketFilter,
    cancelTicketShow
}