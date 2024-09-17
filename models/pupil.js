'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pupil extends Model {
    static associate(models) {
      Pupil.belongsTo(models.SchoolGrade,
        {
        foreignKey: 'gradeNumber'
      }
      );
      Pupil.belongsTo(models.SchoolGrade,
        {
        foreignKey: 'gradeLetter'
      }
      );
    }
  }
  Pupil.init({
    pupilId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    lastName: DataTypes.STRING(30),
    firstName: DataTypes.STRING(30),
    surName: DataTypes.STRING(30),
    birthDate: DataTypes.DATE,
    gradeNumber: DataTypes.TINYINT,
    gradeLetter: DataTypes.CHAR(1)
    }, {
    sequelize,
    modelName: 'Pupil',
  });
 
  return Pupil;
};