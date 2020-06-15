

const dashboardIndex = (req, res) => {
    const data = {
        total_bus: "",
        total_customer: "",
        total_ticket_sale: "",
        total_ticket_cancle: "",
        total_booking_request: "",
        total_success_payment: ""
    }


    res.status(200).json({
        dashboard_data: data
    })
}



module.exports = {
    dashboardIndex
}