'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pupil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //Pupil.belongsTo(models.SchoolGrade);
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