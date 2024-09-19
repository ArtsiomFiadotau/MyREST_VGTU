const validator = require('fastest-validator');
const models = require('../../models');
models.sequelize.sync();

async function subjectteachers_get_singleteacher(req, res, next){
    const teacherId = req.params.teacherId;
    const SingleGrade = await models.SubjectTeacher.findAll({where: {teacherId: teacherId}}, 
      )
    .then(docs => {
       const response = {
            subjects: docs.map(doc => {
            return {
                subjectId: doc.subjectId, 
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

  async function subjectteachers_get_singlesubject(req, res, next){
    const subjectId = req.params.subjectId;
    const SingleGrade = await models.SubjectTeacher.findAll({where: {subjectId: subjectId}}, 
      )
    .then(docs => {
       const response = {
            teachers: docs.map(doc => {
            return {
                teacherId: doc.teacherId, 
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

async function subjectteachers_add_subjectteacher(req, res, next) {
    const subjectteacher = {
      teacherId: req.body.teacherId,
      subjectId: req.body.subjectId
    }

    const schema = {
      subjectId: {type:"number", optional: false},
      teacherId: {type:"number", optional: false}}
      
  const v = new validator();
  const validationResponse = v.validate(subjectteacher, schema);
      
      if(validationResponse !== true){
          return res.status(400).json({
              message: "Validation failed",
              errors: validationResponse
          });
      }

    try {
        const subjectTeacher = await models.SubjectTeacher.create(subjectteacher);
        return res.status(201).json(subjectTeacher);
      } catch (error) {
        return res.status(500).json({ message: 'Error adding subject-teacher relation', error });
      }
    };

    async function subjectteachers_delete_subjectteacher(req, res, next){
      const delSubjectTeacher = {
        teacherId: req.body.teacherId,
        subjectId: req.body.subjectId}
  
        const schema = {
          subjectId: {type:"number", optional: false},
          teacherId: {type:"number", optional: false}}
          
      const v = new validator();
      const validationResponse = v.validate(delSubjectTeacher, schema);
          
          if(validationResponse !== true){
              return res.status(400).json({
                  message: "Validation failed",
                  errors: validationResponse
              });
          }

      const destroySubjectTeacher = models.SubjectTeacher.destroy({where:{subjectId: delSubjectTeacher.subjectId, teacherId: delSubjectTeacher.teacherId}})
      .then(result => {
          res.status(200).json({
              message: 'Subject-Teacher relation deleted!',
              request: {
                  type: 'POST',
                  url: 'http://localhost:3000/academicgradesubjects/',
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
    subjectteachers_get_singleteacher,
    subjectteachers_get_singlesubject,
    subjectteachers_add_subjectteacher,
    subjectteachers_delete_subjectteacher
   }