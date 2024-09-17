const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    immutable: true,
  },
  item: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    immutable: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: String,
  dateCreated: {
    type: Date,
    required: true,
    immutable: true,
  },
  lastModified: {
    type: Date,
    required: true,
  },
});

const review = mongoose.model('reviews', reviewSchema);

module.exports = review;
