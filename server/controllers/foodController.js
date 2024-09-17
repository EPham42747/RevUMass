const mongoose = require('mongoose');

const Food = require('../models/foodModel');
const Review = require('../models/reviewModel');

const getAllFood = async (req, res, next) => {
  try {
    return res.status(200).json(mongoose.find({}));
  }
  catch (error) {
    next(error);
  }
};

const getFoodById = async (req, res, next) => {
  try {
    const data = await Food.findById(req.params.id).exec();

    if (!data) return res.status(404).json({ message: 'Food not found' });
    return res.status(200).json(data);
  }
  catch (error) {
    next(error);
  }
};

const addReview = async (req, res, next) => {
  try {
    const data = req.body;
    const review = new Review({
      author: data.author,
      item: data.item,
      rating: data.rating,
      review: data.review,
      dateCreated: Date.now(),
      lastModified: Date.now(),
    });

    await review.save();
    return res.status(200).json({ message: 'Successfully added review' });
  }
  catch (error) {
    next(error);
  }
};

module.exports = {
  getAllFood,
  getFoodById,
  addReview,
};
