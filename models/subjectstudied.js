'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubjectStudied extends Model {
    static associate(models) {
       //SubjectStudied.belongsTo(models.Subject);
       //SubjectStudied.belongsTo(models.AcademicGrade);
    }
  }
  SubjectStudied.init({
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
    modelName: 'SubjectStudied',
  });
  return SubjectStudied;
};