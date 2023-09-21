const AuthController = require('../controllers/AuthController')
const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken')

router.post('/', verifyToken, AuthController.login)

module.exports = router