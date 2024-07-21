const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Pupil = require('../models/pupil');

router.get('/', (req, res, next) => {
    Pupil.find()
    .select('firstName lastName form age _id')
    .exec()
    .then(docs => {
       const response = {
        count: docs.length,
        pupils: docs.map(doc => {
            return {
                firstName: doc.firstName,
                lastName: doc.lastName,
                form: doc.form,
                age: doc.age,
                _id: doc._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/pupils/' + doc._id
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
});

router.post('/', (req, res, next) => {
    const pupil = new Pupil({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        form: req.body.form,
        age: req.body.age
    });
    pupil.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'New pupil added succesfully!',
            createdPupil: {
                firstName: result.firstName,
                lastName: result.lastName,
                form: result.form,
                age: result.age,
                _id: result._id,
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/pupils/' + result._id
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
});

router.get('/:pupilId', (req, res, next) => {
    const id = req.params.pupilId;
    Pupil.findById(id)
        .select('firstName lastName form age _id')
        .exec()
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
});

router.patch('/:pupilId', (req, res, next) => {
    const id = req.params.pupilId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Pupil.updateOne({ _id: id }, { $set: updateOps })
    .exec()
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
});

router.delete('/:pupilId', (req, res, next) => {
    const id = req.params.pupilId;
    Pupil.deleteOne({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Pupil deleted!',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/pupils/',
                body: { firstName: 'String', lastName: 'String', form: 'Number', age: 'Number'}
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;