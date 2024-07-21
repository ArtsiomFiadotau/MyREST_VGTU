const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Subject = require('../models/subject');

router.get('/', (req, res, next) => {
    Subject.find()
    .select('title')
    .exec()
    .then(docs => {
       const response = {
        count: docs.length,
        subjects: docs.map(doc => {
            return {
                title: doc.title,
                _id: doc._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/subjects/' + doc._id
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
    const subject = new Subject({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title
    });
    subject
        .save()
        .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'New subject added succesfully!',
            createdSubject: {
                title: result.title,
                _id: result._id,
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/subjects/' + result._id
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

router.get('/:subjectId', (req, res, next) => {
    const id = req.params.subjectId;
    Subject.findById(id)
        .select('title _id')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
            res.status(200).json({
                subject: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/subjects'
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

router.patch('/:subjectId', (req, res, next) => {
    const id = req.params.subjectId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Subject.updateOne({ _id: id }, { $set: updateOps })
    .exec()
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
});

router.delete('/:subjectId', (req, res, next) => {
    const id = req.params.subjectId;
    Subject.deleteOne({ _id: id })
    .exec()
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
});

module.exports = router;