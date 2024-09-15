const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const SubjectTeacherController = require('../controllers/subjectteachers');

//router.get('/', SubjectTeacherController.subjectteachers_get_all);

router.post('/', checkAuth, SubjectTeacherController.subjectteachers_add_subjectteacher);

module.exports = router;