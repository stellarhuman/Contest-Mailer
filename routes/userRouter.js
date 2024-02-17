const express = require('express')
const router = express.Router()
const controllers = require('../controllers/userController')

router.route('/login').get(controllers.loginController)
router.route('/register').post(controllers.registerUserController)

module.exports = router