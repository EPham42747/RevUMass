const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/reviewController');

router.use(express.json());

router.post('/add', reviewController.addReview);
router.get('/:reviewId', reviewController.getReview);
router.put('/:reviewId/edit', reviewController.updateReview);
router.delete('/:reviewId/delete', reviewController.deleteReview);

module.exports = router;
