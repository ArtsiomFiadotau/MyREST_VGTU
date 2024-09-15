const models = require('../../models');
models.sequelize.sync();

async function subjectacademicgrades_add_subjectacademicgrade(req, res, next) {
    const subjectacademicgrade = {
        gradeNumber: req.body.gradeNumber,
        subjectId: req.body.subjectId
        };
        if (subjectacademicgrade.gradeNumber && subjectacademicgrade.subjectId) {
    const SubjectAcademicGrade1 = await models.SubjectAcademicGrade.create(subjectacademicgrade).then(result => {
        console.log(result);
        res.status(201).json(result);
})
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        });
    });
}
}


module.exports = {
    subjectacademicgrades_add_subjectacademicgrade
   }