const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User');
const StudySpot = require('./StudySpot');

const StudySpotReview = sequelize.define(
  'StudySpotReview',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
    studySpotId: {
      type: DataTypes.INTEGER,
      references: {
        model: StudySpot,
        key: 'id',
      },
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    tableName: 'study_spot_reviews',
  },
);

module.exports = StudySpotReview;
