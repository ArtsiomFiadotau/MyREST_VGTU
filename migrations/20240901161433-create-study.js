'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Studies', {
      gradeNumber: {
        primaryKey: true,
        type: Sequelize.TINYINT
      },
      gradeLetter: {
        primaryKey: true,
        type: Sequelize.CHAR
      },
      subjectId: {
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      teacherId: {
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Studies');
  }
};