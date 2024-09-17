const mongoose = require('mongoose');

const studySpotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    immutable: true,
  }
});

const studySpot = mongoose.model('study_spots', studySpotSchema);

module.exports = studySpot;
