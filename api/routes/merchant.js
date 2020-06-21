const express = require('express')
const router = express.Router()
const dashboardIndexController = require("../controllers/merchant/dashboard/index")



router.get("/dashboard/index/count", dashboardIndexController.countTotal)


module.exports = router