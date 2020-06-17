
// Ticket Sale List
const salesTicketIndex = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const sales_ticket = "Total sale ticket" + " " + limit + " " + currentPage

    res.status(200).json({
        sales_ticket_data: sales_ticket
    })
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
const filterbyDateSalesTicket = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const date = req.params.date
    const sales_ticket = "Total sales ticket by date" + " " + limit + " " + currentPage + " " + date

    res.status(200).json({
        sales_ticket_data: sales_ticket
    })
}


// Filter Sales Ticket
const salesTicketFilter = (req, res) => {
    const data = req.body.data
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const sales_ticket = "Total sales ticket filter by " + " " + data + " " + "Limit" + " " + limit+ " " + currentPage

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
    limitSalesTicketSelect,
    filterbyDateSalesTicket,
    salesTicketFilter,
    salesTicketShow
}