const mongoose = require('mongoose');

const responses = require('../utils/responses');
const userController = require('../controllers/userController');
const Review = require('../models/reviewModel');

const getReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    
    if (!review)
      return res.status(responses.error.NOT_FOUND.code)
        .json(responses.error.NOT_FOUND.json);

    return res.status(responses.success.OK.code).json({
      ...responses.success.OK.json,
      data: review,
    });
  }
  catch (error) {
    next(error);
  }
};

const addReview = async (req, res, next) => {
  // {
  //   author: String (ObjectId)
  //   item: String (ObjectId)
  //   rating: Number
  //   review: String
  // }

  const validate = (req) => {
    const { author, item, rating } = req.body;
    let errors = [];
    
    if (!author) errors.push('\'author\' field missing');
    else if (typeof author !== 'string') errors.push('\'author\' field must be a string');
    if (!item) errors.push('\'item\' field missing');
    else if (typeof item !== 'string') errors.push('\'item\' field must be a string');
    if (!rating) errors.push('\'rating\' field missing');
    else if (typeof rating !== 'number') errors.push('\'rating\' field must be a number');

    return errors;
  };

  try {
    const errors = validate(req);
    if (errors.length !== 0) {
      details = '';
      for (let i = 0; i < errors.length - 1; i++) details += errors[i] + ", ";
      details += errors[errors.length - 1];
      return res.status(responses.error.BAD_REQUEST.code).json({
        ...responses.error.BAD_REQUEST.json,
        details: details,
      });
    }

    const session = await mongoose.startSession();
    let savedReview = {};

    await session.withTransaction(async () => {
      const data = req.body;
      const review = new Review({
        author: data.author,
        item: data.item,
        rating: data.rating,
        review: data.review,
        dateCreated: Date.now(),
        lastModified: Date.now(),
      });
      savedReview = await review.save();
  
      await userController.addReview(req, savedReview._id, session);
    });
    session.endSession();

    return res.status(responses.success.CREATED.code).json({
      ...responses.success.CREATED.json,
      data: savedReview,
    });
  }
  catch (error) {
    next(error);
  }
};

const updateReview = async (req, res, next) => {
  // {
  //   userId: String (ObjectId)
  //   data: {
  //     (optional properties)
  //   }
  // }

  try {
    const data = req.body;

    const oldValue = await Review.findById(req.params.reviewId);
    if (!oldValue)
      return res.status(responses.error.NOT_FOUND.code)
        .json(responses.error.NOT_FOUND.json);

    if (oldValue.author.toString() !== data.userId)
      return res.status(responses.error.FORBIDDEN.code)
        .json(responses.error.FORBIDDEN.json);

    const properties = ['rating', 'review'];
    const changes = {};
    properties.forEach(p => {
      if (p in data.data) changes[p] = data[p]
    });
    
    const newValue = await Review.findByIdAndUpdate(req.params.reviewId, changes, { new: true });
    return res.status(responses.success.NO_CONTENT.code).end();
  }
  catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  // {
  //   userId: String (ObjectId)
  // }

  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review)
      return res.status(responses.error.NOT_FOUND.code)
        .json(responses.error.NOT_FOUND.json);

    if (review.author.toString() !== req.body.userId)
      return res.status(responses.error.FORBIDDEN.code)
        .json(responses.error.FORBIDDEN.json);

    const oldValue = await Review.findByIdAndDelete(req.params.reviewId);
    return res.status(responses.success.OK.code).json({
      ...responses.success.OK.json,
      data: oldValue,
    });
  }
  catch (error) {
    next(error)
  }
};

module.exports = {
  getReview,
  addReview,
  updateReview,
  deleteReview,
};
