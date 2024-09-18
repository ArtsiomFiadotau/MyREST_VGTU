const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const pupilsRoutes = require('./api/routes/pupils');
const subjectsRoutes = require('./api/routes/subjects');
const teachersRoutes = require('./api/routes/teachers');
const academicGradesRoutes = require('./api/routes/academicgrades');
const schoolGradesRoutes = require('./api/routes/schoolgrades');
const subjectTeachersRoutes = require('./api/routes/subjectteachers');
const academicGradeSubjectsRoutes = require('./api/routes/academicgradesubjects');
const studiesRoutes = require('./api/routes/studies');
const userRoutes = require('./api/routes/user');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/pupils', pupilsRoutes);
app.use('/subjects', subjectsRoutes);
app.use('/teachers', teachersRoutes);
app.use('/academicgrades', academicGradesRoutes);
app.use('/schoolgrades', schoolGradesRoutes);
app.use('/subjectteachers', subjectTeachersRoutes);
app.use('/academicgradesubjects', academicGradeSubjectsRoutes);
app.use('/schoolgrades', schoolGradesRoutes);
app.use('/studies', studiesRoutes);
app.use('/user', userRoutes);


app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

module.exports = app;