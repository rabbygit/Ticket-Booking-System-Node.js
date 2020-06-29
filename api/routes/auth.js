const express = require("express")
const router = express.Router()
const adminAuthController = require("../controllers/auth/admin")

router.post('/admin/register', adminAuthController.register)
router.post('/admin/login', adminAuthController.login)
router.post('/admin/logout', adminAuthController.logout)

module.exports = router