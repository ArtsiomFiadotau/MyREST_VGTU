const models = require('../../models');
models.sequelize.sync();
async function subjectstudieds_add_subjectstudied(req, res, next) {
    const subjectstudied = {
        gradeNumber: req.body.gradeNumber,
        subjectId: req.body.subjectId
        };
        if (subjectstudied.gradeNumber && subjectstudied.subjectId) {
    const SubjectStudied1 = await models.SubjectStudied.create(subjectstudied).then(result => {
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
    subjectstudieds_add_subjectstudied
   }