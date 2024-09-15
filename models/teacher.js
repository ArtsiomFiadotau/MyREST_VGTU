'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    static associate(models) {
      Teacher.belongsToMany(models.Subject, {
        through: 'SubjectTeacher',
        foreignKey: 'teacherId',
        otherKey: 'subjectId',
      });
      //Teacher.hasOne(sequelize.define('SchoolGrade'), {
       // onDelete: 'SET NULL',
      //});
    }
 }
  Teacher.init({
    teacherId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    surName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Teacher',
  });
  
  return Teacher;
};