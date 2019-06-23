const userAuth = {};

userAuth.admin = function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.role == 'ADMIN'){
        next()
    } else {
        res.status(401).json({"message": "not admin"});
    }
}

userAuth.normalUser = function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.status(401).json({
        'message': 'access denied'
    });
}

module.exports = userAuth