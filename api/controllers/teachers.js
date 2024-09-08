const models = require('../../models');

exports.teachers_get_all = (req, res, next) => {
    models.Teacher.findAll({
        attributes: {
          include: [],
          exclude: ['updatedAt', 'createdAt', 'SchoolGradeGradeNumber'],
        },
      })
    .then(docs => {
       const response = {
        count: docs.length,
        teachers: docs.map(doc => {
            return {
                firstName: doc.firstName,
                lastName: doc.lastName,
                surName: doc.surName,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/teachers/' + doc.teacherId
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

exports.teachers_add_teacher = (req, res, next) => {
    const teacher = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        surName: req.body.surName,
    };
    models.Teacher.create(teacher).then(result => {
        console.log(result);
        res.status(201).json({
            message: 'New teacher added succesfully!',
            createdTeacher: {
                firstName: result.firstName,
                lastName: result.lastName,
                surName: result.surName,
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/teachers/' + result.teacherId
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

exports.teachers_get_single = (req, res, next) => {
    const id = req.params.teacherId;
    models.Teacher.findByPk(id, {
        attributes: {
          exclude: ['updatedAt', 'createdAt'],
        },
      })
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
            res.status(404).json({message: 'No valid data for id'});
        }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
    });
}
    
    exports.teachers_modify_teacher =(req, res, next) => {
        const id = req.params.teacherId;
        const updatedTeacher = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            surName: req.body.surName
};

        models.Teacher.update(updatedTeacher, {where: { teacherId: id }})
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
    }

    exports.teachers_delete_teacher = (req, res, next) => {
        const id = req.params.teacherId;
        models.Teacher.destroy({where:{teacherId: id}})
        .then(result => {
            res.status(200).json({
                message: 'Teacher deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/teachers/',
                    body: { firstName: 'String', lastName: 'String', surName: 'String'}
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