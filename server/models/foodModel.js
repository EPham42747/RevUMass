const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    immutable: true,
  },
  image: String,
  dateCreated: {
    type: Date,
    required: true,
    immutable: true,
  },
  lastModified: {
    type: Date,
    required: true,
  },
}, { collection: 'food' });

const food = mongoose.model('food', foodSchema);

module.exports = food;
