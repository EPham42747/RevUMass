const sequelize = require('sequelize');

const Food = sequelize.define('Food', {
  id: {
    type: sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: sequelize.DataTypes.STRING,
    allowNull: false,
  },
  image: sequelize.DataTypes.STRING,
  isActive: {
    type: sequelize.DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
}, {
  tableName: 'food',
});

Food.hasMany(FoodReview, { onDelete: 'SET NULL' });

module.exports = Food;
