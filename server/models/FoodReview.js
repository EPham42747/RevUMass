const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User');
const Food = require('./Food');

const FoodReview = sequelize.define(
  'FoodReview',
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
    foodId: {
      type: DataTypes.INTEGER,
      references: {
        model: Food,
        key: 'id',
      },
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        inRange(value) {
          if (parseInt(value) < 1 || parseInt(value) > 5) throw new Error('\'rating\' field must be in range [1, 5]');
        },
      },
    },
    review: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    tableName: 'food_reviews',
  },
);

module.exports = FoodReview;
