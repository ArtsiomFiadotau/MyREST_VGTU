const validator = require('fastest-validator');
const models = require('../../models');
models.sequelize.sync();

async function academicgrades_get_all(req, res, next){
    const allacademicrades = models.AcademicGrade.findAll()
    .then(docs => {
       const response = {
        count: docs.length,
        academicgrades: docs.map(doc => {
            return {
                gradeNumber: doc.gradeNumber,
            }
        })
       };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
}

async function academicgrades_add_academicgrade(req, res, next){
    const academicgrade = {
        gradeNumber: req.body.gradeNumber,
        };

    const schema = {
        gradeNumber: {type:"number", optional: false}}
        
    const v = new validator();
    const validationResponse = v.validate(academicgrade, schema);
        
        if(validationResponse !== true){
            return res.status(400).json({
                message: "Validation failed",
                errors: validationResponse
            });
        }
        
    const newAcademicGrade = models.AcademicGrade.create(academicgrade).then(result => {
        console.log(result);
        res.status(201).json({
            message: 'New AcademicGrade added succesfully!',
            createdAcademicGrade: {
                gradeNumber: result.gradeNumber,
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/academicgrades/' + result.gradeNumber
                }
            }
    });
})
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        });
    });

}


async function academicgrades_delete_academicgrade(req, res, next){
    const id = req.params.gradeNumber;
    const delAcademicGrade = models.AcademicGrade.destroy({where:{gradeNumber: id}})
    .then(result => {
        res.status(200).json({
            message: 'AcademicGrade deleted!',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/academicgrades/',
                body: { gradeNumber: 'tinyint'}
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

module.exports = {
    academicgrades_get_all,
    academicgrades_add_academicgrade,
    academicgrades_delete_academicgrade
}