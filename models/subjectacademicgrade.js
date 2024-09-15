'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubjectAcademicGrade extends Model {
    static associate(models) {
       //SubjectStudied.belongsTo(models.Subject);
       //SubjectStudied.belongsTo(models.AcademicGrade);
    }
  }
  SubjectAcademicGrade.init({
    gradeNumber: {
      type: DataTypes.TINYINT,
      primaryKey: true,
    },
    subjectId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  }, {
    sequelize,
    modelName: 'SubjectAcademicGrade',
  });
  return SubjectAcademicGrade;
};