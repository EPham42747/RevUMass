const { Model, DataTypes } = require('sequelize');

const DormArea = require('./DormArea');

class Dorm extends Model {}

Dorm.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dormAreaId: {
      type: DataTypes.INTEGER,
      references: {
        model: DormArea,
        key: 'id',
      },
      allowNull: false,
    },
    image: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  }, {
    tableName: 'dorms',
  }
);

module.exports = Dorm;
