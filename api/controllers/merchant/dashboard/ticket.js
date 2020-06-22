

// Ticket list
const ticketList = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const merchant_id = req.params.merchant_id
    const status = req.params.status
    let tickets

    res.status(200).json({
        tickets: `${status} tickets`
    })
}


// Select limit 
const limitTicket = (req, res) => {
    const limit = req.query.limit
    const status = req.params.status
    const merchant_id = req.params.merchant_id
    let tickets

    res.status(200).json({
        tickets: `${status} tickets limit`
    })
}


// Filter 
const filterTicket = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const merchant_id = req.params.merchant_id
    const date = req.query.date
    const phone = req.query.phone
    const status = req.params.status
    let tickets

    res.status(200).json({
        tickets: `${date} ${phone} filtered tickets`
    })
}


// View ticket
const viewTicket = (req, res) => {
    const ticket_id = req.params.ticket_id
    const merchant_id = req.params.merchant_id
    const status = req.params.status
    let ticket

    res.status(200).json({
        ticket: `${ticket_id} ticket info`
    })
}



module.exports = {
    ticketList,
    limitTicket,
    filterTicket,
    viewTicket
}