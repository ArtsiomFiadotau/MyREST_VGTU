'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Study extends Model {
    static associate(models) {
      
      Study.belongsTo(models.SchoolGrade,
        {
        foreignKey: 'gradeNumber'
      }
      );
      Study.belongsTo(models.SchoolGrade,
        {
        foreignKey: 'gradeLetter'
      }
      );
      Study.belongsTo(models.SubjectTeacher,
        {
        foreignKey: 'subjectId'
      }
      );
      Study.belongsTo(models.SubjectTeacher,
        {
        foreignKey: 'teacherId'
      }
      );
    }
  }
  Study.init({
    gradeNumber: {
      type: DataTypes.TINYINT,
      primaryKey: true,
    },
    gradeLetter: {
      type: DataTypes.CHAR,
      primaryKey: true,
    },
    subjectId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    teacherId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  }, {
    sequelize,
    modelName: 'Study',
  });
  return Study;
};