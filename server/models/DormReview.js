const { Model, DataTypes } = require('sequelize');

const User = require('./User');
const Dorm = require('./Dorm');

class DormReview extends Model {}

DormReview.init({
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
    dormId: {
      type: DataTypes.INTEGER,
      references: {
        model: Dorm,
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
  }, {
    tableName: 'dorm_reviews',
  }
);

module.exports = DormReview;
