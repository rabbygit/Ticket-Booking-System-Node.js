
// Ticket Sale List
const salesTicketIndex = (req, res) => {
    const limit = req.params.limit
    const sales_ticket = "Total sale ticket" + " " + limit

    res.status(200).json({
        sales_ticket_data: sales_ticket
    })
}


// Sales Ticket Select by Date
const salesTicketSelectByDate = (req, res) => {
    const date = req.params.date
    const limit = req.params.limit
    const sales_ticket = "Total sales ticket by date" + " " + date + " " + "Limit" + " " + limit

    res.status(200).json({
        sales_ticket_data: sales_ticket
    })
}


// Filter by phone
const salesTicketFilter = (req, res) => {
    const phone = req.body.phone
    const limit = req.body.limit
    const sales_ticket = "Total sales ticket filter by phone" + " " + phone + " " + "Limit" + " " + limit

    res.status(200).json({
        sales_ticket_data: sales_ticket
    })
}


// Ticket View
const salesTicketShow = (req, res) => {
    const ticket_id = req.params.id
    const sales_ticket = "sales ticket " + ticket_id

    res.status(200).json({
        sales_ticket_data: sales_ticket
    })
}



module.exports = {
    salesTicketIndex,
    salesTicketSelectByDate,
    salesTicketFilter,
    salesTicketShow
}