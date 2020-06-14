const express = require("express")
const router = express.Router()

// Admin Controllers
const dashboardController = require("../controllers/admin/dashboard")


router.get('/dashboard', dashboardController.dashboardIndex)


module.exports = router