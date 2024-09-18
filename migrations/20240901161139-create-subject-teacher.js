'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SubjectTeachers', {
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
      teacherId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Teachers', // Ссылка на таблицу Teacher
          key: 'teacherId'
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
    await queryInterface.addConstraint('SubjectTeachers', {
      fields: ['subjectId', 'teacherId'],  // поля для составного первичного ключа
      type: 'unique',
      name: 'unique_subject_teacher' // уникальное имя для индекса составного первичного ключа
    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SubjectTeachers');
  }
};