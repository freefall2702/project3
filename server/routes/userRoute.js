const UserController = require('../controllers/UserController');
const verifyToken = require('../middleware/verifyToken')

const router = require('express').Router();

router.get('/', verifyToken, UserController.getInfo)

router.get('/:id', verifyToken, UserController.getInfoUser)

router.post('/', verifyToken, UserController.saveUser)

router.patch('/:id', verifyToken, UserController.editUser)

// router.delete('/:id', verifyToken, UserController.deleteUser)

module.exports = router