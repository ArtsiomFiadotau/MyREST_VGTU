const validator = require('fastest-validator');
const models = require('../../models');
models.sequelize.sync();

async function academicgradesubjects_get_singlegrade(req, res, next){
  const gradeNumber = req.params.gradeNumber;
  const SingleGrade = await models.AcademicGradeSubject.findAll({where: {gradeNumber: gradeNumber}}
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

async function academicgradesubjects_get_singlesubject(req, res, next){
  const subjectId = req.params.subjectId;
  const SingleSubject = await models.AcademicGradeSubject.findAll({where: {subjectId: subjectId}}, 
    )
  .then(docs => {
     const response = {
          grades: docs.map(doc => {
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

async function academicgradesubjects_add_academicgradesubject(req, res, next) {
    const academicGradeSubject = {
      gradeNumber: req.body.gradeNumber,
      subjectId: req.body.subjectId}

    const schema = {
      gradeNumber: {type:"number", optional: false},
      subjectId: {type:"number", optional: false}}
      
  const v = new validator();
  const validationResponse = v.validate(academicGradeSubject, schema);
      
      if(validationResponse !== true){
          return res.status(400).json({
              message: "Validation failed",
              errors: validationResponse
          });
      }

    try {
        const AcademicGradesubject = await models.AcademicGradeSubject.create(academicGradeSubject);
        return res.status(201).json(AcademicGradesubject);
      } catch (error) {
        return res.status(500).json({ message: 'Error adding AcademicGrade-subject relation', error });
      }
    };

    async function academicgradesubjects_delete_academicgradesubject(req, res, next){
      const delAcademicGradeSubject = {
        gradeNumber: req.body.gradeNumber,
        subjectId: req.body.subjectId}
  
      const schema = {
        gradeNumber: {type:"number", optional: false},
        subjectId: {type:"number", optional: false}}
        
    const v = new validator();
    const validationResponse = v.validate(delAcademicGradeSubject, schema);
        
        if(validationResponse !== true){
            return res.status(400).json({
                message: "Validation failed",
                errors: validationResponse
            });
        }

      const destroyAcademicGradeSubject = models.AcademicGradeSubject.destroy({where:{subjectId: delAcademicGradeSubject.subjectId, gradeNumber: delAcademicGradeSubject.gradeNumber}})
      .then(result => {
          res.status(200).json({
              message: 'AcademicGrade-Subject relation deleted!',
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
  academicgradesubjects_get_singlegrade,
  academicgradesubjects_get_singlesubject,
  academicgradesubjects_add_academicgradesubject,
  academicgradesubjects_delete_academicgradesubject
   }