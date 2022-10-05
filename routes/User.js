const express = require('express')
const router = express.Router()

const controller = require('../controllers/UserController')

router.get('/', controller.addUser)

router.get('/list', controller.getUsers)

router.get('/:id', controller.getUser)

router.post('/add', controller.insertUser)

router.get('/edit/:id', controller.editUser)

router.post('/edit/:id', controller.updateUser)

router.post('/delete/:id', controller.deleteUser)

module.exports = router