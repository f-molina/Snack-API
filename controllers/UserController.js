const User = require('../models/user');
const userController = {};
const passport = require('passport');

//register user
userController.register = passport.authenticate('local-register', {
    successRedirect: '/api/v1/users/profile',
    failureRedirect: '/api/v1/users/register',
    failureFlash: true
}), (req, res, next) => {
    res.status(200).json({"message": "Registered"});
};

//login user
userController.login = passport.authenticate('local-login', {
    successRedirect: '/api/v1/users/profile',
    failureRedirect: '/api/v1/users/login',
    failureFlash: true
}), (req, res, next) => {
    res.status(200).json({"message": "logged in"});
};

//logout
userController.logout = (req, res, next) => {
    req.logout();
    res.status(200).json({"message": "logged out"});
};

//list of users
userController.getUsers = (req, res, next) => {
    let listSort = {name: 1};
    User.find({}, (err, users) => {
        if(err)
        return res.status(400).send({"err": err});
        return res.status(200).send({users});
    }).sort(listSort);
};

module.exports = userController;