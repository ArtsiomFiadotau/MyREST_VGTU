'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AcademicGrade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //AcademicGrade.belongsToMany(models.Subject, {through: 'SubjectStudied'});
      // define association here
    }
  }
  AcademicGrade.init({
    gradeNumber: {
      type: DataTypes.TINYINT,
      primaryKey: true,
    },
  }, {
    sequelize,
    modelName: 'AcademicGrade',
    timestamps: false,
  });
  return AcademicGrade;
};