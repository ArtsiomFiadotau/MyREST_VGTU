'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
 class SchoolGrade extends Model {
    static associate(models) {
      SchoolGrade.belongsTo(models.Teacher, {
         foreignKey: 'teacherId'
      });
      SchoolGrade.belongsTo(models.AcademicGrade, {
        foreignKey: 'gradeNumber'
     });
      SchoolGrade.hasMany(sequelize.define('Pupil')); 
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
    teacherId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'SchoolGrade',
    timestamps: false,
  });
  
  return SchoolGrade;
};