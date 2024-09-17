const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  reputation: {
    type: Number,
    required: true,
  },
  reviews: {
    type: [Number],
    required: true,
  },
  dateAccountCreated: {
    type: Date,
    required: true,
    immutable: true,
  },
});

const user = new mongoose.model('users', userSchema);

module.exports = user;
