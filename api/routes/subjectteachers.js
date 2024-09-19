const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const SubjectTeacherController = require('../controllers/subjectteachers');

router.get('/teacher/:teacherId', SubjectTeacherController.subjectteachers_get_singleteacher);

router.get('/subject/:subjectId', SubjectTeacherController.subjectteachers_get_singlesubject);

router.post('/', checkAuth, SubjectTeacherController.subjectteachers_add_subjectteacher);

router.delete('/', checkAuth, SubjectTeacherController.subjectteachers_delete_subjectteacher);

module.exports = router;