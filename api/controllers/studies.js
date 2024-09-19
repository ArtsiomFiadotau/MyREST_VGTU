const validator = require('fastest-validator');
const models = require('../../models');
models.sequelize.sync();

async function studies_get_singleschoolgrade(req, res, next){
    const gradeNumber = req.params.gradeNumber;
    const gradeLetter = req.params.gradeLetter;
    const SingleGrade = await models.Study.findAll({where: {gradeNumber: gradeNumber, gradeLetter: gradeLetter}}, 
      )
    .then(docs => {
       const response = {
            subjects: docs.map(doc => {
            return {
                subjectId: doc.subjectId,
                teacherId: doc.teacherId 
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

async function studies_add_study(req, res, next) {
    const study = {
      gradeNumber: req.body.gradeNumber,
      gradeLetter: req.body.gradeLetter,
      subjectId: req.body.subjectId,
      teacherId: req.body.teacherId}

    const schema = {
      gradeNumber: {type:"number", optional: false},
      gradeLetter: {type:"string", optional: false, max: '1'},
      subjectId: {type:"number", optional: false},
      teacherId: {type:"number", optional: false}}
      
  const v = new validator();
  const validationResponse = v.validate(study, schema);
      
      if(validationResponse !== true){
          return res.status(400).json({
              message: "Validation failed",
              errors: validationResponse
          });
      }
      const check = models.AcademicGradeSubject.findOne({where:{gradeNumber: study.gradeNumber, subjectId: study.subjectId}})
      .then(result => {
    if (result === null) {
        return res.status(500).json({
            message: 'Cannot add subject to grade'
        });
    }
    else {
    const newSubject = models.Study
    .create(study)
    .then(result => {
    console.log(result);
    res.status(201).json(study);
    })
.catch(err => {
    console.log(err)
    res.status(500).json({
        error: err
        }); 
    });
    }     
})
.catch(err => {
    console.log(err)
    res.status(500).json({
        error: err
    });
})    
}

    async function studies_delete_study(req, res, next){
        const delStudy = {
            gradeNumber: req.body.gradeNumber,
            gradeLetter: req.body.gradeLetter,
            subjectId: req.body.subjectId,
            teacherId: req.body.teacherId}
    
        const schema = {
            gradeNumber: {type:"number", optional: false},
            gradeLetter: {type:"string", optional: false, max: '1'},
            subjectId: {type:"number", optional: false},
            teacherId: {type:"number", optional: false}}
          
      const v = new validator();
      const validationResponse = v.validate(delStudy, schema);
          
          if(validationResponse !== true){
              return res.status(400).json({
                  message: "Validation failed",
                  errors: validationResponse
              });
          }
  
        const destroyStudy = models.Study.destroy({where:{gradeNumber: delStudy.gradeNumber, gradeLetter: delStudy.gradeLetter, subjectId: delStudy.subjectId, teacherId: delStudy.teacherId,}})
        .then(result => {
            res.status(200).json({
                message: 'Study deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/studies/',
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
        studies_get_singleschoolgrade,
        studies_add_study,
        studies_delete_study
    }