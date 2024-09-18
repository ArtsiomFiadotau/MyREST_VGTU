'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Studies', {
      gradeNumber: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.TINYINT,
      },
      gradeLetter: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR,
      },
      subjectId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      teacherId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
    await queryInterface.addConstraint('Studies', {
      fields: ['gradeNumber', 'gradeLetter'], // оба поля для составного внешнего ключа из SchoolGrades
      type: 'foreign key',
      references: {
        table: 'SchoolGrades',
        fields: ['gradeNumber', 'gradeLetter'], // ссылка на оба поля внешней таблицы 
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    await queryInterface.addConstraint('Studies', {
      fields: ['subjectId', 'teacherId'], // оба поля для составного внешнего ключа из SubjectTeachers
      type: 'foreign key',
      references: {
        table: 'SubjectTeachers',
        fields: ['subjectId', 'teacherId'], // ссылка на оба поля внешней таблицы
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Studies');
  }
};