const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject'}
});

module.exports = mongoose.model('Teacher', teacherSchema);