const express = require('express')
const router = express.Router()
const controllers = require('../controllers/userController')
const authenticateToken = require('../middleware/jwtAuthenticate')

router.route('/login').post(controllers.loginController)
router.route('/register').post(controllers.registerUserController)
router.route('/dashboard').get(authenticateToken,controllers.fetchUserdashboard)

module.exports = router