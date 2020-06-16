

const dashboardIndex = (req, res) => {
    const data = {
        total_customers: "",
        total_merchant: "",
        total_bus: "",
        total_sales_ticket: "",
        total_cancle_ticket: "",
        booking_requests: "",
        paid_booking: "",
        booked_tickets: "",
        today_buses: "",
        today_booked_buses: "",
        today_available_seats: ""
    }


    res.status(200).json({
        bus_dashboard_data: data
    })
}



module.exports = {
    dashboardIndex
}