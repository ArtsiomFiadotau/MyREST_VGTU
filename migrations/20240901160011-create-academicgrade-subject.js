'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AcademicGradeSubjects', {
      gradeNumber: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.TINYINT,
        references: {
          model: 'AcademicGrades', // Ссылка на таблицу Subject
          key: 'gradeNumber'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      subjectId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Subjects', // Ссылка на таблицу Subject
          key: 'subjectId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('AcademicGradeSubjects');
  }
};