const BoardingController = require('../controllers/BoardingController')
const verifyToken = require('../middleware/verifyToken')
const router = require('express').Router();

router.get('/', verifyToken, BoardingController.getListBoarding)

router.get('/:id', verifyToken, BoardingController.getBoarding)

router.post('/', verifyToken, BoardingController.registerBoarding)

router.patch('/:id', verifyToken, BoardingController.editBoarding)

router.delete('/:id', verifyToken, BoardingController.softDeleteBoarding)

router.post('/:id', verifyToken, BoardingController.registerBoarding)

module.exports = router