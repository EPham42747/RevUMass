const mongoose = require('mongoose');

const dormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    immutable: true,
  },
  area: {
    type: String,
    required: true,
    immutable: true,
  }
});

const dorm = mongoose.model('dorms', dormSchema);

module.exports = dorm;
