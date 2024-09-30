const { DataTypes} = require('sequelize');
const Dorm = require('./Dorm');

module.exports = (sequelize, Sequelize) => {
  const DormArea = sequelize.define(
    'DormArea',
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
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      tableName: 'dorm_areas',
    }
  );

  return DormArea;
};
