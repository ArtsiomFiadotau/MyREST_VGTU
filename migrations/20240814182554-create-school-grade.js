'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SchoolGrades', {
      gradeNumber: {
        allowNull: false,
        type: Sequelize.TINYINT,
        references: {
          model: 'AcademicGrades',
          key: 'gradeNumber'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE'
      },
      gradeLetter: {
        allowNull: false,
        type: Sequelize.CHAR(1)
      },
      teacherId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Teachers',
          key: 'teacherId'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'SET NULL'
      }
    });
    await queryInterface.addConstraint('SchoolGrades', {
      fields: ['gradeNumber', 'gradeLetter'],  // поля для составного первичного ключа
      type: 'unique',
      name: 'unique_grade_number_letter' // уникальное имя для индекса составного первичного ключа
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SchoolGrades');
  }
};
