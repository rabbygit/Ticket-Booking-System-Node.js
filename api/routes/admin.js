const express = require("express")
const router = express.Router()

// Admin Controllers
const dashboardController = require("../controllers/admin/dashboard/dashboard")
const transportController = require("../controllers/admin/dashboard/transport")
const customerController = require("../controllers/admin/dashboard/customer")
const successPaymentController = require("../controllers/admin/dashboard/success_payment")
const salesTicketController = require("../controllers/admin/dashboard/sales_ticket")
const cancelTicketController = require("../controllers/admin/dashboard/cancle_ticket")
const bookingRequestController = require("../controllers/admin/dashboard/booking_request")


router.get('/dashboard', dashboardController.dashboardIndex)

// Transport
router.get('/dashboard/transport/:limit', transportController.transportIndex)
router.get('/dashboard/transport/:id/show', transportController.transportShow)
router.get('/dashboard/transport/:id/edit', transportController.transportEdit)
router.put('/dashboard/transport/:id/update', transportController.transportUpdate)
router.delete('/dashboard/transport/:id/delete', transportController.transportDelete)
router.post('/dashboard/transport/filter/date', transportController.filterByDate)
router.post('/dashboard/transport/filter/transportid-location', transportController.filterByTransportIdLocation)


// Customer
router.get('/dashboard/customer/:limit', customerController.customerIndex)
router.get('/dashboard/customer/:id/show', customerController.customerShow)
router.delete('/dashboard/customer/:id/delete', customerController.customerDelete)
router.get('/dashboard/customer/:gender/:limit/select', customerController.customerSelectByLimitGender)
router.post('/dashboard/customer/filter/phone', customerController.customerFilterByPhone)


// Success Payment
router.get('/dashboard/success-payment/:limit', successPaymentController.successPaymentsIndex)
router.post('/dashboard/success-payment/filter', successPaymentController.successPaymentFilter)
router.get('/dashboard/success-payment/:id/invoice', successPaymentController.successPaymentInvoiceShow)


// Sales Ticket
router.get('/dashboard/sales-ticket/:limit', salesTicketController.salesTicketIndex)
router.get('/dashboard/sales-ticket/:date/:limit/select', salesTicketController.salesTicketSelectByDate)
router.post('/dashboard/sales-ticket/filter', salesTicketController.salesTicketFilter)
router.get('/dashboard/sales-ticket/:id/show', salesTicketController.salesTicketShow)


// Cancel Ticket
router.get('/dashboard/cancel-ticket/:limit', cancelTicketController.cancelTicketIndex)
router.get('/dashboard/cancel-ticket/:date/:limit/select', cancelTicketController.cancelTicketSelectByDate)
router.post('/dashboard/cancel-ticket/filter', cancelTicketController.cancelTicketFilter)
router.get('/dashboard/cancel-ticket/:id/show', cancelTicketController.cancelTicketShow)


// Booking Request
router.get('/dashboard/booking-requests/:limit', bookingRequestController.bookingRequestIndex)
router.post('/dashboard/booking-requests/filter', bookingRequestController.bookingRequestFilter)
router.get('/dashboard/booking-request/:id/show', bookingRequestController.bookingRequestShow)
router.get('/dashboard/booking-request/:id/edit', bookingRequestController.bookingRequestEdit)
router.put('/dashboard/booking-request/:id/update', bookingRequestController.bookingRequestUpdate)
router.put('/dashboard/booking-request/:id/paid', bookingRequestController.bookingRequestPaid)
router.delete('/dashboard/booking-request/:id/delete', bookingRequestController.bookingRequestDelete)


module.exports = router