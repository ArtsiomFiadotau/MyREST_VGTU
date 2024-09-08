'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubjectStudied extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       SubjectStudied.belongsTo(models.Subject);
       SubjectStudied.belongsTo(models.AcademicGrade);
      // define association here
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