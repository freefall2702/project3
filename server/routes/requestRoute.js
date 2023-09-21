const RequestController = require('../controllers/RequestController.js')
const verifyToken = require('../middleware/verifyToken')
const router = require('express').Router();

router.get('/', verifyToken, RequestController.getListUserRequest)

router.post('/', verifyToken, RequestController.userRequest)

module.exports = router