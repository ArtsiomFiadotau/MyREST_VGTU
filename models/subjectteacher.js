'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubjectTeacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SubjectTeacher.belongsTo(models.Subject);
      SubjectTeacher.belongsTo(models.Teacher);
      // define association here
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