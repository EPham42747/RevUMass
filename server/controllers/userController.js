const mongoose = require('mongoose');

const User = require('../models/userModel');

// Updates user's reviews list to reflect added review
// Primarily used in conjunction with foodController.addReview()
const addReview = async (req, reviewId, session) => {
  const user = User.findByIdAndUpdate(
    req.body.author,
    { $push: { reviews: reviewId } },
    {
      new: true,
      session,
    }
  );

  if (!user) throw new Error('User not found');
  return user;
};

module.exports = {
  addReview,
};
