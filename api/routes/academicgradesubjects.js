const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const AcademicGradeSubjectController = require('../controllers/academicgradesubjects');

//router.get('/', AcademicGradeSubjectController.academicgradesubjects_get_all);

router.post('/', checkAuth, AcademicGradeSubjectController.academicgradesubjects_add_academicgradesubject);

router.delete('/', checkAuth, AcademicGradeSubjectController.academicgradesubjects_delete_academicgradesubject);

module.exports = router;