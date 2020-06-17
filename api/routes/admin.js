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



// Admin Dashboard

// Index
router.get('/dashboard', dashboardController.dashboardIndex)


// Transport
router.get('/dashboard/transport/', transportController.transportIndex)
router.get('/dashboard/transport/:id/:type/show', transportController.transportShow)
router.get('/dashboard/transport/:id/:type/edit', transportController.transportEdit)
router.put('/dashboard/transport/:id/:type/update', transportController.transportUpdate)
router.delete('/dashboard/transport/:id/:type/delete', transportController.transportDelete)
router.post('/dashboard/transport/filter/date/', transportController.filterByDate)
router.post('/dashboard/transport/filter/', transportController.filterTransport)


// Customer
router.get('/dashboard/customer/', customerController.customerIndex)
router.get('/dashboard/customer/:id/show', customerController.customerShow)
router.delete('/dashboard/customer/:id/delete', customerController.customerDelete)
router.get('/dashboard/customer/:gender/select/', customerController.customerSelectByLimitGender)
router.post('/dashboard/customer/filter/', customerController.customerFilter)


// Success Payment
router.get('/dashboard/success-payment/', successPaymentController.successPaymentsIndex)
router.post('/dashboard/success-payment/:limit/select', successPaymentController.limitSuccessPayments)
router.post('/dashboard/success-payment/filter/', successPaymentController.successPaymentFilter)
router.get('/dashboard/success-payment/:id/invoice', successPaymentController.successPaymentInvoiceShow)


// Sales Ticket
router.get('/dashboard/sales-ticket/', salesTicketController.salesTicketIndex)
router.get('/dashboard/sales-ticket/limit/select/', salesTicketController.limitSalesTicketSelect)
router.get('/dashboard/sales-ticket/:date/filter/', salesTicketController.filterbyDateSalesTicket)
router.post('/dashboard/sales-ticket/filter/', salesTicketController.salesTicketFilter)
router.get('/dashboard/sales-ticket/:id/show', salesTicketController.salesTicketShow)


// Cancel Ticket
router.get('/dashboard/cancel-ticket/', cancelTicketController.cancelTicketIndex)
router.get('/dashboard/cancel-ticket/limit/select/', cancelTicketController.limitCancelTicket)
router.get('/dashboard/cancel-ticket/:date/filter/', cancelTicketController.cancelTicketFilterByDate)
router.post('/dashboard/cancel-ticket/filter/', cancelTicketController.cancelTicketFilter)
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
router.get('/bus/dashboard/customers/:limit/select', busDashboardCustomerController.limitCustomerSelect)
router.get('/bus/dashboard/customers/:gender/gender/filter/', busDashboardCustomerController.filterCustomeByGender)
router.post('/bus/dashboard/customers/filter/', busDashboardCustomerController.filterCustomer)
router.get('/bus/dashboard/customers/:id/show', busDashboardCustomerController.customerShow)

// Bus Dashboard Merchant
router.get('/bus/dashboard/merchants/', busDashboardMerchantController.merchantIndex)
router.post('/bus/dashboard/merchants/filter/', busDashboardMerchantController.filterMerchant)
router.put('/bus/dashboard/merchant/:id/change/status', busDashboardMerchantController.changeMerchantStatus)
router.get('/bus/dashboard/merchant/:id/profile', busDashboardMerchantController.showMerchantProfile)
router.get('/bus/dashboard/merchant/:id/dashboard', busDashboardMerchantController.merchantDashboard)
router.delete('/bus/dashboard/merchant/:id/delete', busDashboardMerchantController.deleteMerchant)

// Bus Dashboard Bus List
router.get('/bus/dashboard/bus-list/', busDashboardBusListController.busIndex)
router.get('/bus/dashboard/bus-list/:date/filter/', busDashboardBusListController.filterBusByDate)
router.post('/bus/dashboard/bus-list/filter/', busDashboardBusListController.filterBus)
router.get('/bus/dashboard/bus-list/:id/:type/show', busDashboardBusListController.showBus)
router.get('/bus/dashboard/bus-list/:id/:type/edit', busDashboardBusListController.editBus)
router.put('/bus/dashboard/bus-list/:id/update', busDashboardBusListController.updateBus)
router.delete('/bus/dashboard/bus-list/:id/delete', busDashboardBusListController.deleteBus)



module.exports = router