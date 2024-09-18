const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const StudyController = require('../controllers/studies');

//router.get('/', AcademicGradeSubjectController.academicgradesubjects_get_all);

router.post('/', checkAuth, StudyController.studies_add_study);

router.delete('/', checkAuth, StudyController.studies_delete_study);

module.exports = router;