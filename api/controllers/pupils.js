const models = require('../../models');
models.sequelize.sync();
//const mongoose = require('mongoose');

async function pupils_get_grade(req, res, next){
    const gradeNumber = req.params.gradeNumber;
    const gradeLetter = req.params.gradeLetter;
    const SchoolGrade = await models.Pupil.findAll({where: {gradeNumber: gradeNumber, gradeLetter: gradeLetter}}, 
      )
    .then(docs => {
       const response = {
        count: docs.length,
        pupils: docs.map(doc => {
            return {
                firstName: doc.firstName,
                lastName: doc.lastName,
                surName: doc.surName,
                //birthDate: doc.birthDate,
                //gradeNumber: doc.gradeNumber,
                //gradeLetter: doc.gradeLetter,
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

async function pupils_add_pupil(req, res, next){
    const pupil = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        surName: req.body.surName,
        birthDate: req.body.birthDate,
        gradeNumber: req.body.gradeNumber,
        gradeLetter: req.body.gradeLetter,
    };
    const newPupil = models.Pupil.create(pupil).then(result => {
        console.log(result);
        res.status(201).json({
            message: 'New pupil added succesfully!',
            createdPupil: {
                firstName: result.firstName,
                lastName: result.lastName,
                surName: result.surName,
                birthDate: result.birthDate,
                gradeNumber: result.gradeNumber,
                gradeLetter: result.gradeLetter,
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/pupils/' + result.pupilId
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

async function pupils_get_single(req, res, next){
    const id = req.params.pupilId;
    const singlePupil = models.Pupil.findByPk(id, {
        attributes: {
          exclude: ['updatedAt', 'createdAt'],
        },
      })
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
            res.status(200).json({
                pupil: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/pupils'
                }
            });
        } else {
            res.status(404).json({message: 'No valid data for id'});
        }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
    });
}

async function pupils_modify_pupil(req, res, next){
    const id = req.params.pupilId;
    const updatedPupil = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        surName: req.body.surName,
        birthDate: req.body.birthDate,
        gradeNumber: req.body.gradeNumber,
        gradeLetter: req.body.gradeLetter,
    };
    
    const updPupil = models.Pupil.update(updatedPupil, {where: { pupilId: id }})
    .then(result => {
        res.status(200).json({
            message: 'Pupil data updated!',
            request: {
                type: 'PATCH',
                url: 'http://localhost:3000/pupils/' + id
            }
        });

    })
    .catch(err => {
        console.log(err);
        res.status(500),json({
            error: err
        });
    });
}

async function pupils_delete_pupil(req, res, next){
    const id = req.params.pupilId;
    const destroyPupil = models.Pupil.destroy({where:{pupilId: id}})
    .then(result => {
        res.status(200).json({
            message: 'Pupil deleted!',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/pupils/',
                body: { firstName: 'String(30)', lastName: 'String(30)', surName: 'String(30)', birthDate: 'Date', gradeNumber: 'tinyint', gradeLetter: 'char(1)'}
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
    pupils_get_grade,
    pupils_add_pupil,
    pupils_get_single,
    pupils_modify_pupil,
    pupils_delete_pupil
}