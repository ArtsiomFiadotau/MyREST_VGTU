const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const PupilController = require('../controllers/pupils');

router.get('/', PupilController.pupils_get_all);

router.get('/grade/:gradeNumber/:gradeLetter', PupilController.pupils_get_grade);

router.post('/', checkAuth, PupilController.pupils_add_pupil);

router.get('/:pupilId', PupilController.pupils_get_single);

router.patch('/:pupilId', checkAuth, PupilController.pupils_modify_pupil);

router.delete('/:pupilId', checkAuth, PupilController.pupils_delete_pupil);

module.exports = router;