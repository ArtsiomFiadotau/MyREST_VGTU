'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AcademicGradeSubject extends Model {
    static associate(models) {
       AcademicGradeSubject.belongsTo(models.Subject);
       AcademicGradeSubject.belongsTo(models.AcademicGrade);
    }
  }
  AcademicGradeSubject.init({
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
    modelName: 'AcademicGradeSubject',
  });
  return AcademicGradeSubject;
};