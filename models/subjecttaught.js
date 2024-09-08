'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubjectTaught extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SubjectTaught.belongsTo(models.Subject);
      SubjectTaught.belongsTo(models.Teacher);
      // define association here
    }
  }
  SubjectTaught.init({
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
    modelName: 'SubjectTaught',
  });
  return SubjectTaught;
};