const validator = require('fastest-validator');
const models = require('../../models');
models.sequelize.sync();

async function schoolgrades_get_all(req, res, next) {
    const allGrades = await models.SchoolGrade.findAll({
        include:[models.Teacher]
    })
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
}

async function schoolgrades_get_single(req, res, next) {
    const id1 = req.params.gradeNumber;
    const id2 = req.params.gradeLetter;

    const singleGrade = await models.SchoolGrade.findOne(
        {
            where: {
              gradeNumber: id1,
              gradeLetter: id2,
            },
            include:[models.Teacher]
        })
        .then(result => {
            console.log("From database", result);
            if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({message: 'No such SchoolGrade!'});
        }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
    });
}

async function schoolgrades_add_schoolgrade(req, res, next) {
    const schoolgrade = {
        gradeNumber: req.body.gradeNumber,
        gradeLetter: req.body.gradeLetter,
        teacherId: req.body.teacherId
        };

        const schema = {
            gradeNumber: {type:"number", optional: false},
            gradeLetter: {type:"string", optional: false, max: '1'},
            teacherId: {type:"number", optional: true},
        }
            
        const v = new validator();
        const validationResponse = v.validate(schoolgrade, schema);
            
            if(validationResponse !== true){
                return res.status(400).json({
                    message: "Validation failed",
                    errors: validationResponse
                });
            }

        if (schoolgrade.gradeNumber && schoolgrade.gradeLetter) {
    const newSchoolGrade = await models.SchoolGrade.create(schoolgrade).then(result => {
        console.log(result);
        res.status(201).json({
            message: 'New School Grade added succesfully!',
            createdschoolGrade: {
                gradeNumber: result.gradeNumber,
                gradeLetter: result.gradeLetter,
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/schoolgrades/' + result.gradeNumber + '/' + result.gradeLetter
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
}

async function schoolgrades_modify_schoolgrade(req, res, next) {
    const id1 = req.params.gradeNumber;
    const id2 = req.params.gradeLetter;
    const updatedSchoolGrade = {
        gradeNumber: req.body.gradeNumber,
        gradeLetter: req.body.gradeLetter,
        teacherId: req.body.teacherId
    };
    
    const schema = {
        gradeNumber: {type:"number", optional: true},
        gradeLetter: {type:"string", optional: true, max: '1'},
        teacherId: {type:"number", optional: true},
    }
        
    const v = new validator();
    const validationResponse = v.validate(updatedSchoolGrade, schema);
        
        if(validationResponse !== true){
            return res.status(400).json({
                message: "Validation failed",
                errors: validationResponse
            });
        }

    const updSchoolGrade = await models.SchoolGrade.update(updatedSchoolGrade, {where: {gradeNumber: id1, gradeLetter: id2}})
    .then(result => {
        res.status(200).json({
            message: 'SchoolGrade data updated!',
            request: {
                type: 'PATCH',
                url: 'http://localhost:3000/schoolgrades/' + id1 + '/' + id2
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

async function schoolgrades_delete_schoolgrade(req, res, next) {
    const id1 = req.params.gradeNumber;
    const id2 = req.params.gradeLetter;
    const destrSchoolGrade = await models.SchoolGrade.destroy({where: {gradeNumber: id1, gradeLetter: id2}})
    .then(result => {
        res.status(200).json({
            message: 'SchoolGrade deleted!',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/schoolgrades/',
                body: { gradeNumber: 'tinyint', gradeLetter: 'char'}
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
    schoolgrades_get_all,
    schoolgrades_get_single,
    schoolgrades_add_schoolgrade,
    schoolgrades_modify_schoolgrade,
    schoolgrades_delete_schoolgrade
}