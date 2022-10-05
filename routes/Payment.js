const express = require('express')
const router = express.Router()

const controller = require('../controllers/PaymentController')

router.get('/createpremiumbill/:id', controller.createPremiumBill)

router.get('/finishpay', controller.finishpayBill)

module.exports = router