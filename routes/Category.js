const express = require('express')
const router = express.Router()

const controller = require('../controllers/CategoryController')

router.get('/', controller.addCategory)

router.get('/list', controller.getCategories)

router.get('/detail/:id', controller.getCategory)

router.post('/add', controller.insertCategory)

router.get('/edit/:id', controller.editCategory)

router.post('/edit/:id', controller.updateCategory)

router.post('/delete/:id', controller.destroyCategory)

module.exports = router