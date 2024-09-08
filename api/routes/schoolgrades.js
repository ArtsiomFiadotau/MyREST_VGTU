const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const SchoolGradeController = require('../controllers/schoolgrades');

router.get('/', SchoolGradeController.schoolgrades_get_all);

router.post('/', checkAuth, SchoolGradeController.schoolgrades_add_schoolgrade);

router.delete('/:gradeNumber+gradeLetter', checkAuth, SchoolGradeController.schoolgrades_delete_schoolgrade);

module.exports = router;