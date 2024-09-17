'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Study extends Model {
    static associate(models) {
      Study.hasMany(sequelize.define('AcademicGradeSubject'));
      Study.hasMany(sequelize.define('SchoolGrade'));
      Study.hasMany(sequelize.define('SubjectTeacher'));
    }
  }
  Study.init({
    gradeNumber: DataTypes.TINYINT,
    gradeLetter: DataTypes.CHAR,
    subjectId: DataTypes.INTEGER,
    teacherId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Study',
  });
  return Study;
};