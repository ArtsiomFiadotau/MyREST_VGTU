const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const models = require('../../models');

async function user_signup(req, res, next){
    const userSignUp = models.User.findOne({where:{email: req.body.email}})
    .then(user => {
        if (user) {
            return res.status(409).json({
                message: 'Email existo'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = {
                        email: req.body.email,
                        password: hash
                    };
                    const createdUser = models.User
                    .create(user)
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'User created'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            }); 
        }
    })
}

async function user_login(req, res, next){
    const userLogin = models.User.findOne({where:{email: req.body.email}})
     .then(user => {
            if(user === null) {
                    return res.status(401).json({
                        message: 'Authorisation failed'
                    });
            }
            bcrypt.compare(req.body.password, user.password, (err, result) =>{
                if (err) {
                    return res.status(401).json({
                        message: 'Authorisation failed'
                    });
            }
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, 
                    process.env.JWT_KEY, 
                    {
                        expiresIn: "1h"    
                    }

                    );
                    return res.status(200).json({
                        message: 'Authorisation successful',
                        token: token
                    });
                }
                res.status(401).json({
                    message: 'Authorisation failed'
                });
            });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
}

async function user_delete(req, res, next){
    const delUser = models.User.deleteOne({id: req.params.userId})
        .then(result => {
            res.status(200).json({
                message: 'User deleted'
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
    user_signup,
    user_login,
    user_delete
}