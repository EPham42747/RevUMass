const sequelize = require('sequelize');

const User = require('./User');
const Food = require('./Food');

const FoodReview = sequelize.define('FoodReview',
  {
    id: {
      type: sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: {
      type: sequelize.DataTypes.INTEGER,
      allowNull: false,
      validate: {
        inRange(value) {
          if (parseInt(value) < 1 || parseInt(value) > 5) throw new Error('\'rating\' field must be in range [1, 5]');
        },
      },
    },
    review: sequelize.DataTypes.STRING,
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

FoodReview.hasOne(Food);
FoodReview.hasOne(User);

module.exports = FoodReview;
