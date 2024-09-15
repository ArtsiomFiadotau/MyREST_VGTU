const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const SubjectStudiedsController = require('../controllers/subjectstudieds');

router.get('/', SubjectStudiedsController.subjectstudieds_get_all);

router.post('/', checkAuth, SubjectStudiedsController.subjectstudieds_add_subjectstudied);

module.exports = router;