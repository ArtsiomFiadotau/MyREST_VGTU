const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const SubjectController = require('../controllers/subjects');

router.get('/', SubjectController.subjects_get_all);

router.post('/', checkAuth, SubjectController.subjects_add_subject);

router.get('/:subjectId', SubjectController.subjects_get_single);

router.patch('/:subjectId', checkAuth, SubjectController.subjects_modify_subject);

router.delete('/:subjectId', checkAuth, SubjectController.subjects_delete_subject);

module.exports = router;