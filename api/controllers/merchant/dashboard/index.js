

// Count information
const countTotal = (req, res) => {
    let total_bus
    let success_payments
    let total_sales_ticket
    let total_cancel_ticket
    let total_booking_request
    let total_today_bus
    let total_today_booked
    let today_available_seat
    const merchant_id = req.params.id

    res.status(200).json({
        total_bus: "Total bus count",
        success_payments: "Total success payments count",
        total_sales_ticket: "Total sales ticket",
        total_cancel_ticket: "Total cancel ticket",
        total_booking_request: "Total booking request",
        total_today_bus: "Total today bus",
        total_today_booked: "Total today booked",
        today_available_seat: "Total today available seat"
    })
}




module.exports = {
    countTotal
}