const express = require('express')
const router = express.Router()

const controller = require('../controllers/LoginLogoutController')

router.get('/', controller.backdefault)

router.get('/home', controller.homepage)

router.get('/loginpage', controller.loginpage)

router.get('/newUserfromAuth0', controller.newUserfromAuth0)

router.post('/addnewauthuser', controller.addAuth0User)

router.post('/login', controller.login)

router.post('/logout', controller.logout)

module.exports = router