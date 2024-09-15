const models = require('../../models');
models.sequelize.sync();

async function subjectteachers_add_subjectteacher(req, res, next) {
    const teacherId = req.body.teacherId;
    const subjectId = req.body.subjectId;
    try {
        if (!teacherId || !subjectId) {
          return res.status(400).json({ message: 'teacherId and subjectId are required.' });
        }
    
        const subjectTeacher = await models.SubjectTeacher.create({ teacherId, subjectId });
        return res.status(201).json(subjectTeacher);
      } catch (error) {
        return res.status(500).json({ message: 'Error adding subject-teacher relation', error });
      }
    };


module.exports = {
    subjectteachers_add_subjectteacher
   }