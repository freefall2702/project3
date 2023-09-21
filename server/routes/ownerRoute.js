const OwnerController = require('../controllers/OwnerController');
const verifyToken = require('../middleware/verifyToken')
const router = require('express').Router();

router.get('/', verifyToken, OwnerController.getInfo)

router.get('/:id', verifyToken, OwnerController.getInfoOwner)

router.post('/', verifyToken, OwnerController.saveOwner)

router.patch('/:id', verifyToken, OwnerController.editOwner)

// router.delete('/:id', verifyToken, OwnerController.deleteOwner)

module.exports = router