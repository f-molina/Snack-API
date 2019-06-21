const User = require('../models/user');
const userController = {};
const passport = require('passport');

userController.register = passport.authenticate('local-register', {
    successRedirect: '/login',
    failureRedirect: '/register',
    failureFlash: true
});

userController.login = passport.authenticate('local-login', {
    successRedirect: '/api/v1/api-docs',
    failureRedirect: '/login',
    failureFlash: true
});

module.exports = userController;