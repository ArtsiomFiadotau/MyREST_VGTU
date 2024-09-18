'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubjectTeacher extends Model {
    static associate(models) {
      //SubjectTeacher.belongsTo(models.Subject);
      //SubjectTeacher.belongsTo(models.Teacher);
    }
  }
  SubjectTeacher.init({
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
    modelName: 'SubjectTeacher',
  });
  return SubjectTeacher;
};