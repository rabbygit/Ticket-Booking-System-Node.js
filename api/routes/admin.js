const express = require("express")
const router = express.Router()

// Admin Controllers
const dashboardController = require("../controllers/admin/dashboard/dashboard")
const transportController = require("../controllers/admin/dashboard/transport")
const customerController = require("../controllers/admin/dashboard/customer")
const successPaymentController = require("../controllers/admin/dashboard/success_payment")


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



module.exports = router