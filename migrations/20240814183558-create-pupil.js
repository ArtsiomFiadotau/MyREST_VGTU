'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pupils', {
      pupilId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      surName: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      birthDate: {
        type: Sequelize.DATE
      },
      gradeNumber: {
        type: Sequelize.TINYINT
      },
      gradeLetter: {
        type: Sequelize.CHAR(1)
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
    await queryInterface.dropTable('Pupils');
  }
};