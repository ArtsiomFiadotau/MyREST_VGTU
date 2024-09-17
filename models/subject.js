'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    static associate(models) {
      Subject.belongsToMany(models.Teacher, {
        through: 'SubjectTeacher',
        foreignKey: 'subjectId',
        otherKey: 'teacherId',
      });
      Subject.belongsToMany(models.AcademicGrade, {
        through: 'AcademicGradeSubject',
        foreignKey: 'subjectId',
        otherKey: 'gradeNumber',
      });
    }
  }
  Subject.init({
    subjectId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    subjectTitle: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Subject',
  });
  return Subject;
};