const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Teacher = require('../models/teacher');
const Subject = require('../models/subject');

router.get('/', (req, res, next) => {
    Teacher.find()
    .select('firstName lastName subject _id')
    .populate('subject', 'title')
    .exec()
    .then(docs => {
       const response = {
        count: docs.length,
        teachers: docs.map(doc => {
            return {
                firstName: doc.firstName,
                lastName: doc.lastName,
                subject: doc.subject,
                _id: doc._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/teachers/' + doc._id
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
    Subject.findById(req.body.subjectId)
        .then(subject => {
            if (!subject) {
                return res.status(404).json({
                    message: 'Subject not found'
                });
            }
            const teacher = new Teacher({
                _id: new mongoose.Types.ObjectId(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                subject: req.body.subjectId,
            });
            return teacher.save();
        })
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'New teacher added succesfully!',
                    createdTeacher: {
                        _id: result._id,
                        firstName: result.firstName,
                        lastName: result.lastName,
                        subject: result.subject
                        },
                        request: {
                            type: 'POST',
                            url: 'http://localhost:3000/teachers/' + result._id
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

router.get('/:teacherId', (req, res, next) => {
    const id = req.params.teacherId;
    Teacher.findById(id)
        .select('firstName lastName subject _id')
        .populate('subject', 'title')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
            res.status(200).json({
                teacher: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/teachers'
                }
            });
        } else {
            res.status(404).json({message: 'Teacher not found'});
        }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
    });
});

router.patch('/:teacherId', (req, res, next) => {
    const id = req.params.teacherId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Teacher.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Teacher data updated!',
            request: {
                type: 'PATCH',
                url: 'http://localhost:3000/teachers/' + id
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

router.delete('/:teacherId', (req, res, next) => {
    const id = req.params.teacherId;
    Teacher.deleteOne({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Teacher deleted!',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/teachers/',
                body: { firstName: 'String', lastName: 'String', subjectId: 'ID'}
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