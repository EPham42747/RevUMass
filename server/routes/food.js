const express = require('express');
const router = express.Router();

const foodController = require('../controllers/foodController');

router.use(express.json());

router.get('/', foodController.getAllFood);
router.get('/:foodId', foodController.getFoodById);

module.exports = router;
