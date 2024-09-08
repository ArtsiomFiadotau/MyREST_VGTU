'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SchoolGrades', {
      gradeNumber: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.TINYINT
      },
      gradeLetter: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR
      },
      teacherId: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SchoolGrades');
  }
};