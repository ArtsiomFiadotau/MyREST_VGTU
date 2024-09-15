'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Study extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Study.hasMany(sequelize.define('SubjectAcademicGrade'));
      Study.hasMany(sequelize.define('SchoolGrade'));
      Study.hasMany(sequelize.define('SubjectTeacher'));
      // define association here
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