const express = require("express")
const router = express.Router()

// Admin Dashboard Controllers
const dashboardController = require("../controllers/admin/dashboard/dashboard")
const transportController = require("../controllers/admin/dashboard/transport")
const customerController = require("../controllers/admin/dashboard/customer")
const successPaymentController = require("../controllers/admin/dashboard/success_payment")
const salesTicketController = require("../controllers/admin/dashboard/sales_ticket")
const cancelTicketController = require("../controllers/admin/dashboard/cancle_ticket")
const bookingRequestController = require("../controllers/admin/dashboard/booking_request")

// Admin Bus Controllers
const busDashboardController = require("../controllers/admin/bus/dashboard/dashboard")
const busDashboardCustomerController = require("../controllers/admin/bus/dashboard/customer")
const busDashboardMerchantController = require("../controllers/admin/bus/dashboard/merchant")
const busDashboardBusListController = require("../controllers/admin/bus/dashboard/bus")
const busDashboardSalesTicketController = require("../controllers/admin/bus/dashboard/sales_ticket")
const busDashboardCancelController = require("../controllers/admin/bus/dashboard/cancel_ticket")
const busDashboardBookingRequestController = require("../controllers/admin/bus/dashboard/booking_request")
const busDashboardPaidBookedBookingController = require("../controllers/admin/bus/dashboard/paid_booked_booking")
const busDashboardTodayBusController = require("../controllers/admin/bus/dashboard/today_bus")
const busDashboardTodayBookedController = require("../controllers/admin/bus/dashboard/today_booked")
const busDashboardTodayAvailableSeatController = require("../controllers/admin/bus/dashboard/today_available_seat")

const busMerchantController = require("../controllers/admin/bus/merchant/merchant")
const busAgentController = require("../controllers/admin/bus/merchant/agent")
const busBookingController = require("../controllers/admin/bus/booking/booking")
const busPaymentController = require("../controllers/admin/bus/payment/payment")


// Admin Dashboard

// Index
router.get('/dashboard', dashboardController.dashboardIndex)

// Transport
router.get('/dashboard/transport/bus/', transportController.transportIndex)
router.get('/dashboard/transport/bus/search', transportController.transportSearch)
router.get('/dashboard/transport/bus/:id/show', transportController.transportShow)
router.put('/dashboard/transport/bus/:id/update', transportController.transportUpdate)
router.get('/dashboard/transport/bus/:id/delete', transportController.transportDelete)

// Customer
router.get('/dashboard/customer/', customerController.customerIndex)
router.get('/dashboard/customer/:id/show', customerController.customerShow)
router.get('/dashboard/customer/:id/delete', customerController.customerDelete)
router.get('/dashboard/customer/filter/', customerController.customerSelectByLimitGender)
router.get('/dashboard/customer/search/:number', customerController.customerFilter)


// Success Payment 
router.get('/dashboard/success-payment/', successPaymentController.successPaymentsIndex)
router.get('/dashboard/success-payment/filter/', successPaymentController.successPaymentFilter)
router.get('/dashboard/success-payment/:id/invoice', successPaymentController.successPaymentInvoiceShow)


// Sales Ticket
router.get('/dashboard/sales-ticket/', salesTicketController.salesTicketIndex)
router.get('/dashboard/sales-ticket/filter/', salesTicketController.filterbyDateSalesTicket)
router.get('/dashboard/sales-ticket/:id/show', salesTicketController.salesTicketShow)


// Cancel Ticket
router.get('/dashboard/cancel-ticket/', cancelTicketController.cancelTicketIndex)
router.get('/dashboard/cancel-ticket/filter/', cancelTicketController.cancelTicketFilterByDate)
router.get('/dashboard/cancel-ticket/:id/show', cancelTicketController.cancelTicketShow)


// Booking Request
router.get('/dashboard/booking-requests/', bookingRequestController.bookingRequestIndex)
router.post('/dashboard/booking-requests/filter/', bookingRequestController.bookingRequestFilter)
router.get('/dashboard/booking-request/:id/show', bookingRequestController.bookingRequestShow)
router.get('/dashboard/booking-request/:id/edit', bookingRequestController.bookingRequestEdit)
router.put('/dashboard/booking-request/:id/update', bookingRequestController.bookingRequestUpdate)
router.put('/dashboard/booking-request/:id/paid', bookingRequestController.bookingRequestPaid)
router.delete('/dashboard/booking-request/:id/delete', bookingRequestController.bookingRequestDelete)



// Admin Bus

// Bus Dashboard Index
router.get('/bus/dashboard/index', busDashboardController.dashboardIndex)

// Bus Dashboard Customer
router.get('/bus/dashboard/customers/', busDashboardCustomerController.customerIndex)
router.get('/bus/dashboard/customers/filter/', busDashboardCustomerController.filterCustomer)
router.get('/bus/dashboard/customers/search/:number', busDashboardCustomerController.customerFilterByNumber)
router.get('/bus/dashboard/customers/:id/show', busDashboardCustomerController.customerShow)
router.get('/bus/dashboard/customer/:id/delete', busDashboardCustomerController.customerDelete)


// Bus Dashboard Merchant
router.get('/bus/dashboard/merchants/', busDashboardMerchantController.merchantIndex)
router.get('/bus/dashboard/merchants/filter/', busDashboardMerchantController.filterMerchant)
router.get('/bus/dashboard/merchant/:id/change/status', busDashboardMerchantController.changeMerchantStatus)
router.get('/bus/dashboard/merchant/:id/profile', busDashboardMerchantController.showMerchantProfile)
router.get('/bus/dashboard/merchant/:id/dashboard', busDashboardMerchantController.merchantDashboard)
router.delete('/bus/dashboard/merchant/:id/delete', busDashboardMerchantController.deleteMerchant)

// Bus Dashboard Bus List
router.get('/bus/dashboard/bus-list/', busDashboardBusListController.busIndex)
router.get('/bus/dashboard/bus-list/filter/', busDashboardBusListController.filterBus)
router.get('/bus/dashboard/bus-list/:id/show', busDashboardBusListController.showBus)
router.get('/bus/dashboard/bus-list/:id/edit', busDashboardBusListController.editBus)
router.put('/bus/dashboard/bus-list/:id/update', busDashboardBusListController.updateBus)
router.delete('/bus/dashboard/bus-list/:id/delete', busDashboardBusListController.deleteBus)

// Bus Dashboard Total Ticket Sale
router.get('/bus/dashboard/sales-ticket/', busDashboardSalesTicketController.salesTicketIndex)
router.get('/bus/dashboard/sales-ticket/filter/', busDashboardSalesTicketController.salesTicketFilter)
router.get('/bus/dashboard/sales-ticket/:id/show', busDashboardSalesTicketController.salesTicketShow)

// Bus Dashboard Cancel Ticket
router.get('/bus/dashboard/cancel-ticket/', busDashboardCancelController.cancelTicketIndex)
router.post('/bus/dashboard/cancel-ticket/filter/', busDashboardCancelController.cancelTicketFilter)
router.get('/bus/dashboard/cancel-ticket/:id/show', busDashboardCancelController.cancelTicketShow)

// Bus Dashboard Booking Request
router.get('/bus/dashboard/booking-requests/', busDashboardBookingRequestController.bookingRequestIndex)
router.post('/bus/dashboard/booking-requests/filter/', busDashboardBookingRequestController.bookingRequestFilter)
router.get('/bus/dashboard/booking-request/:id/show', busDashboardBookingRequestController.bookingRequestShow)
router.get('/bus/dashboard/booking-request/:id/edit', busDashboardBookingRequestController.bookingRequestEdit)
router.put('/bus/dashboard/booking-request/:id/update', busDashboardBookingRequestController.bookingRequestUpdate)
router.put('/bus/dashboard/booking-request/:id/paid', busDashboardBookingRequestController.bookingRequestPaid)
router.delete('/bus/dashboard/booking-request/:id/delete', busDashboardBookingRequestController.bookingRequestDelete)

// Bus Dashboard Paid & Booked Booking
router.get('/bus/dashboard/booking/:status/', busDashboardPaidBookedBookingController.bookingList)
router.get('/bus/dashboard/booking/:status/limit/select/', busDashboardPaidBookedBookingController.limitBooking)
router.post('/bus/dashboard/booking/:status/filter/', busDashboardPaidBookedBookingController.filterBooking)
router.get('/bus/dashboard/booking/:status/:id/show', busDashboardPaidBookedBookingController.showBooking)

// Bus Dashboard Today Bus
router.get('/bus/dashboard/today/bus', busDashboardTodayBusController.busList)
router.get('/bus/dashboard/today/bus/filter/', busDashboardTodayBusController.filterBus)
router.get('/bus/dashboard/today/bus/:id/show', busDashboardTodayBusController.showBus)

// Bus Dashboard Today Booked
router.get('/bus/dashboard/today/:date/', busDashboardTodayBookedController.bookedList)
router.post('/bus/dashboard/today/filter/', busDashboardTodayBookedController.filterBookedList)
router.get('/bus/dashboard/today/:id/show', busDashboardTodayBookedController.showBus)
router.get('/bus/dashboard/today/:id/edit', busDashboardTodayBookedController.editBus)
router.put('/bus/dashboard/today/:id/update', busDashboardTodayBookedController.updateBus)
router.put('/bus/dashboard/today/:id/cancel', busDashboardTodayBookedController.cancelBooking)

// Bus Dashboard Today Available Seat
router.get('/bus/dashboard/today/available/seats/', busDashboardTodayAvailableSeatController.availableSeats)
router.get('/bus/dashboard/today/available/seats/filter/', busDashboardTodayAvailableSeatController.filterAvailableSeat)


// Bus Dashboard Merchant
router.get('/bus/merchant/index/count', busMerchantController.merchantIndex)
router.post('/bus/merchant/add', busMerchantController.addMerchant)
router.get('/bus/merchant/:status/list/', busMerchantController.merchantList)
router.get('/bus/merchant/:status/filter/', busMerchantController.filterMerchant)
router.get('/bus/merchant/:id/view/profile', busMerchantController.viewProfile)
router.get('/bus/merchant/:id/dashboard', busMerchantController.merchantDashboard)
router.get('/bus/merchant/:id/update/status', busMerchantController.merchantStatusUpdate)
router.delete('/bus/merchant/:id/delete', busMerchantController.deleteMerchant)


// Bus Dashboard Agent
router.post('/bus/agent/add', busAgentController.addAgent)
router.get('/bus/agent/:status/list/', busAgentController.agentList)
router.post('/bus/agent/filter/', busAgentController.filterAgent)
router.get('/bus/agent/:id/view/profile', busAgentController.viewProfile)
router.get('/bus/agent/:id/dashboard', busAgentController.agentDashboard)
router.put('/bus/agent/:id/update/status', busAgentController.agentStatusUpdate)
router.delete('/bus/agent/:id/delete', busAgentController.deleteAgent)


// Bus Dashboard Booking
router.get('/bus/booking/count', busBookingController.bookingCount)
router.post('/bus/booking/add', busBookingController.addBooking)
router.get('/bus/booking/list/', busBookingController.bookingList)
router.post('/bus/booking/filter/', busBookingController.filterBooking)
router.get('/bus/booking/:status/:limit/select', busBookingController.limitBooking)
router.get('/bus/booking/:id/show', busBookingController.showBooking)
router.get('/bus/booking/:id/edit', busBookingController.editBooking)
router.put('/bus/booking/:id/update', busBookingController.updtaeBooking)
router.put('/bus/booking/status/:id/update', busBookingController.bookingStatusUpdate)
router.delete('/bus/booking/:id/delete', busBookingController.deleteBooking)


// Bus Dashboard Payment
router.get('/bus/payment/count', busPaymentController.paymentCount)
router.get('/bus/payment/list/', busPaymentController.paymentList)
router.post('/bus/payment/limit/', busPaymentController.limitPayment)
router.post('/bus/payment/filter/', busPaymentController.filterPayment)
router.get('/bus/payment/:id/view', busPaymentController.viewPayment)
router.put('/bus/payment/transaction/:id/change', busPaymentController.paymentTransactionStatus)
router.delete('/bus/payment/:id/delete', busPaymentController.deletePayment)


module.exports = router