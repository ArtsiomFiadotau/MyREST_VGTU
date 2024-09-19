const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const AcademicGradeSubjectController = require('../controllers/academicgradesubjects');

router.get('/grade/:gradeNumber', AcademicGradeSubjectController.academicgradesubjects_get_singlegrade);

router.get('/subject/:subjectId', AcademicGradeSubjectController.academicgradesubjects_get_singlesubject);

router.post('/', checkAuth, AcademicGradeSubjectController.academicgradesubjects_add_academicgradesubject);

router.delete('/', checkAuth, AcademicGradeSubjectController.academicgradesubjects_delete_academicgradesubject);

module.exports = router;