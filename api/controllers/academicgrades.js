const models = require('../../models');
const mongoose = require('mongoose');

exports.academicgrades_get_all = (req, res, next) => {
    models.AcademicGrade.findAll()
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

exports.academicgrades_add_academicgrade = (req, res, next) => {
    const academicgrade = {
        gradeNumber: req.body.gradeNumber,
        };
        if (academicgrade.gradeNumber) {
    models.AcademicGrade.create(academicgrade).then(result => {
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
}

exports.academicgrades_delete_academicgrade = (req, res, next) => {
    const id = req.params.gradeNumber;
    models.AcademicGrade.destroy({where:{gradeNumber: id}})
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