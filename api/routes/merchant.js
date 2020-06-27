const express = require('express')
const router = express.Router()

const dashboardIndexController = require("../controllers/merchant/dashboard/index")
const dashboardBusController = require("../controllers/merchant/dashboard/bus")
const dashboardPaymentController = require("../controllers/merchant/dashboard/payment")
const dashboardTicketController = require("../controllers/merchant/dashboard/ticket")
const dashboardBookingRequestController = require("../controllers/merchant/dashboard/booking")
const dashboardBookedController = require("../controllers/merchant/dashboard/booked")
const dashboardAvailableSeatController = require("../controllers/merchant/dashboard/seat")


router.get('/dashboard/:id/index/count', dashboardIndexController.countTotal)

// dashboard bus
router.post('/dashboard/:merchant_id/bus/add', dashboardBusController.addBus)
router.get('/dashboard/:merchant_id/bus/list/', dashboardBusController.busList)
router.post('/dashboard/:merchant_id/date/filter/', dashboardBusController.filterByDate)
router.get('/dashboard/:merchant_id/bus/filter/', dashboardBusController.filterBus)
router.get('/dashboard/:merchant_id/bus/:bus_id/show', dashboardBusController.showBus)
router.put('/dashboard/:merchant_id/bus/:bus_id/update', dashboardBusController.updateBus)
router.delete('/dashboard/:merchant_id/bus/:bus_id/delete', dashboardBusController.deleteBus)


// dashboard payment
router.get('/dashboard/:merchant_id/:status/payment/', dashboardPaymentController.paymentList)
router.get('/dashboard/:merchant_id/:status/payment/limit/', dashboardPaymentController.limitPaymentSelect)
router.post('/dashboard/:merchant_id/:status/payment/filter/', dashboardPaymentController.filterPayment)
router.get('/dashboard/:merchant_id/:status/payment/:payment_id/invoice', dashboardPaymentController.paymentInvoice)


// dashboard ticket
router.get('/dashboard/:merchant_id/ticket/:status/list/', dashboardTicketController.ticketList)
router.get('/dashboard/:merchant_id/ticket/:status/limit/', dashboardTicketController.limitTicket)
router.post('/dashboard/:merchant_id/ticket/:status/filter/', dashboardTicketController.filterTicket)
router.get('/dashboard/:merchant_id/ticket/:status/:ticket_id', dashboardTicketController.viewTicket)


// dashboard booking request
router.post('/dashboard/:merchant_id/booking/add', dashboardBookingRequestController.addBooking)
router.get('/dashboard/:merchant_id/booking/:status/requests/', dashboardBookingRequestController.bookingRequests)
router.post('/dashboard/:merchant_id/booking/:status/request/filter/date/', dashboardBookingRequestController.filterByDate)
router.post('/dashboard/:merchant_id/booking/:status/request/filter/phone/', dashboardBookingRequestController.filterByPhone)
router.get('/dashboard/:merchant_id/booking/request/:booking_id/view', dashboardBookingRequestController.viewBooking)
router.put('/dashboard/:merchant_id/booking/:booking_id/request/update', dashboardBookingRequestController.cancelBooking)


// Today booked
router.get('/dashboard/:merchant_id/booked/', dashboardBookedController.bookedList)
router.post('/dashboard/:merchant_id/booked/filter/', dashboardBookedController.filterBooked)
router.get('/dashboard/:merchant_id/booked/:booked_id/view', dashboardBookedController.viewBooked)
router.put('/dashboard/:merchant_id/booked/:booked_id/update', dashboardBookedController.updateBooked)
router.put('/dashboard/:merchant_id/booked/:booked_id/cancel', dashboardBookedController.cancelBooked)


// Today available seats
router.get('/dashboard/:merchant_id/seats/available/', dashboardAvailableSeatController.availableSeatList)
router.post('/dashboard/:merchant_id/seta/available/filter/', dashboardAvailableSeatController.filterByContact)


// Account Management index
// Account Management success trip tickets

module.exports = router