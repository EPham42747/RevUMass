const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const StudySpot = sequelize.define(
  'StudySpot', 
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    tableName: 'study_spots',
  },
);

module.exports = StudySpot;
