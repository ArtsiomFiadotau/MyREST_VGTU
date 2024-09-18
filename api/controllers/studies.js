const validator = require('fastest-validator');
const models = require('../../models');
models.sequelize.sync();

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

    try {
        const newStudy = await models.Study.create(study);
        return res.status(201).json(study);
      } catch (error) {
        return res.status(500).json({ message: 'Error adding Study', error });
      }
    };

    module.exports = {
        studies_add_study
    }