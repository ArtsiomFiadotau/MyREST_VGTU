const models = require('../../models');
const mongoose = require('mongoose');

exports.schoolgrades_get_all = (req, res, next) => {
    models.SchoolGrade.findAll()
    .then(docs => {
       const response = {
        count: docs.length,
        schoolgrades: docs.map(doc => {
            return {
                gradeNumber: doc.gradeNumber,
                gradeLetter: doc.gradeLetter,
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

exports.schoolgrades_add_schoolgrade = (req, res, next) => {
    const schoolgrade = {
        gradeNumber: req.body.gradeNumber,
        gradeLetter: req.body.gradeLetter,
        };
        if (schoolgrade.gradeNumber) {
    models.SchoolGrade.create(schoolgrade).then(result => {
        console.log(result);
        res.status(201).json({
            message: 'New School Grade added succesfully!',
            createdschoolGrade: {
                gradeNumber: result.gradeNumber,
                gradeLetter: result.gradeLetter,
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/schoolgrades/' + result.gradeNumber + result.gradeLetter
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

exports.schoolgrades_delete_schoolgrade = (req, res, next) => {
    const id1 = req.params.gradeNumber;
    const id2 = req.params.gradeLetter;
    models.schoolGrade.destroy({where:{gradeNumber: id1, gradeLetter: id2}})
    .then(result => {
        res.status(200).json({
            message: 'schoolGrade deleted!',
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