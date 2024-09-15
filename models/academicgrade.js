'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AcademicGrade extends Model {
    static associate(models) {
      AcademicGrade.hasMany(sequelize.define('SchoolGrade'));
      AcademicGrade.belongsToMany(models.Subject, {
        through: 'SubjectAcademicGrade',
        foreignKey: 'gradeNumber',
        otherKey: 'subjectId',
      });
    }
  }
  AcademicGrade.init({
    gradeNumber: {
      type: DataTypes.TINYINT,
      primaryKey: true,
    },
  }, {
    sequelize,
    modelName: 'AcademicGrade',
    timestamps: false,
  });
  return AcademicGrade;
};