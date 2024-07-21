const mongoose = require('mongoose');

const pupilSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    form: { type: String, required: true},
    age: { type: Number, required: true}
});

module.exports = mongoose.model('Pupil', pupilSchema);
