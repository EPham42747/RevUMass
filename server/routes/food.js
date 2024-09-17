const express = require('express');
const router = express.Router();

const foodController = require('../controllers/foodController');

router.use(express.json());

router.get('/', (req, res) => {
  foodController.getAllFood();
});

router.post('/add', foodController.addReview);

router.get('/:id', foodController.getFoodById);

module.exports = router;
