const express = require('express')
const router = express.Router()

const controller = require('../controllers/PostControllers')

router.get('/', controller.addPost)

router.get('/list', controller.getPosts)

router.get('/detail/:id', controller.getPost)

router.post('/add', controller.insertPost)

router.get('/edit/:id', controller.editPost)

router.post('/edit/:id', controller.updatePost)

router.post('/delete/:id', controller.destroyPost)

module.exports = router