const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const TeacherController = require('../controllers/teachers');

router.get('/', TeacherController.teachers_get_all);

router.post('/', checkAuth, TeacherController.teachers_add_teacher);

router.get('/:teacherId', TeacherController.teachers_get_single);

router.patch('/:teacherId', checkAuth, TeacherController.teachers_modify_teacher);

router.delete('/:teacherId', checkAuth, TeacherController.teachers_delete_teacher);

module.exports = router;