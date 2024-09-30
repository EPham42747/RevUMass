const express = require('express');
const router = express.Router();

const foodController = require('../controllers/foodController');

router.use(express.json());

router.get('/', foodController.getAllFood);
router.get('/:foodId', foodController.getFood);

router.get('/:foodId/add', foodController.addReview);
router.get('/:foodId/:reviewId', foodController.getReview);
router.get('/:foodId/:reviewId/update', foodController.updateReview);
router.get('/:foodId/:reviewId/delete', foodController.deleteReview);

module.exports = router;
