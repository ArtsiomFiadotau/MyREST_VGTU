const validator = require('fastest-validator');
const models = require('../../models');
models.sequelize.sync();

async function subjects_get_all(req, res, next){
    const allSubjects = models.Subject.findAll({
        attributes: ['subjectId', 'subjectTitle'],
      })
    .then(docs => {
       const response = {
        count: docs.length,
        subjects: docs.map(doc => {
            return {
                subjectTitle: doc.subjectTitle,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/subjects/' + doc.subjectId
                }
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

async function subjects_add_subject(req, res, next){
    const subject = {
        subjectTitle: req.body.subjectTitle
    };

    const schema = {
        subjectTitle: {type:"string", optional: false, max: '50'},
    }
        
    const v = new validator();
    const validationResponse = v.validate(subject, schema);
        
        if(validationResponse !== true){
            return res.status(400).json({
                message: "Validation failed",
                errors: validationResponse
            });
        }

    const newSubject = models.Subject
        .create(subject)
        .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'New subject added succesfully!',
            createdSubject: {
                subjectTitle: result.subjectTitle,
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/subjects/' + result.subjectId
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

async function subjects_get_single(req, res, next){
    const id = req.params.subjectId;
    const singleSubject = models.Subject.findByPk(subjectId, {
        attributes: {
          exclude: ['updatedAt', 'createdAt'],
        },
      })
        .then(sub => {
            console.log("From database", sub);
            if (sub) {
            res.status(200).json({
                subject: sub,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/subjects'
                }
            });
        } else {
            res.status(404).json({message: 'No subject with such id found'});
        }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
    });
}

async function subjects_modify_subject(req, res, next){
    const id = req.params.subjectId;
    const updatedSubject = {
        subjectTitle: req.body.subjectTitle
    };
    
    const updSubject = models.Subject.update(updatedSubject, {where: { subjectId: id }})
    .then(result => {
        res.status(200).json({
            message: 'Subject data updated!',
            request: {
                type: 'PATCH',
                url: 'http://localhost:3000/subjects/' + id
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

async function subjects_delete_subject(req, res, next){
    const id = req.params.subjectId;
    const destroySubject = models.Subject.destroy({where:{subjectId: id}})
    .then(result => {
        res.status(200).json({
            message: 'Subject deleted!',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/subjects/',
                body: { title: 'String'}
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
    subjects_get_all,
    subjects_add_subject,
    subjects_get_single,
    subjects_modify_subject,
    subjects_delete_subject
}