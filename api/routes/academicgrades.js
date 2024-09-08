const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const AcademicGradeController = require('../controllers/academicgrades');

router.get('/', AcademicGradeController.academicgrades_get_all);

router.post('/', checkAuth, AcademicGradeController.academicgrades_add_academicgrade);

router.delete('/:gradeNumber', checkAuth, AcademicGradeController.academicgrades_delete_academicgrade);

module.exports = router;