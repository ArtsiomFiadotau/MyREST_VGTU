'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SchoolGrade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SchoolGrade.belongsTo(models.Teacher);
      // define association here
    }
  }
  SchoolGrade.init({
    gradeNumber: {
      type: DataTypes.TINYINT,
      primaryKey: true,
    },
    gradeLetter: {
      type: DataTypes.CHAR,
      primaryKey: true,
    },
    teacherId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SchoolGrade',
  });
  return SchoolGrade;
};