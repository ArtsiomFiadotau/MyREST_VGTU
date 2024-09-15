const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const SubjectAcademicGradeController = require('../controllers/subjectacademicgrades');

//router.get('/', SubjectAcademicGradeController.subjectacademicgrades_get_all);

router.post('/', checkAuth, SubjectAcademicGradeController.subjectacademicgrades_add_subjectacademicgrade);

module.exports = router;