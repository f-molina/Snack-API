const router = require('express').Router();

const userController = require('../controllers/UserController');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/register', userController.register);

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', userController.login);

router.get('/api/v1/api-docs', isValidated, (req, res, next) => {
  res.render('/api-docs');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});


function isValidated(req, res, next) {
  if(req.isValidated()) {
    return next();
  }
  res.redirect('/')
}

module.exports = router;