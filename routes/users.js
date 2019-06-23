const router = require('express').Router();

const userAuth = require('../middlewares/userAuth');
const userController = require('../controllers/UserController');

/**
* @swagger
* definitions:
*   user:
*     properties:
*       email:
*         type: string
*       password:
*         type: string
*       required:
*          - email
*          - password
*/

/**
* @swagger
* /users:
*   get:
*     tags:
*       - users
*     summary: List of all users
*     description: Returns all users
*     produces:
*       - application/json
*     responses:
*       200:
*         description: An array of users
*         schema:
*           $ref: '#/definitions/user'
*/
router.get('/users', userController.getUsers);

router.get('/users/register', (req, res, next) => {
  //res.render('register');
});

/**
* @swagger
* /users/register:
*   post:
*     tags:
*       - users
*     summary: Register an user
*     description: Register user with both email and password
*     produces:
*       - application/json
*     parameters:
*       - name: body 
*         in: body
*         schema:
*           $ref: '#/definitions/user'
*           properties:
*              email:
*                type: string
*              password:
*                type: string
*         required:
*          - email
*          - password
*     responses:
*       200:
*         description: Registered!
*/
router.post('/users/register', userController.register);

router.get('/users/login', (req, res, next) => {
  //res.render('login');
});

/**
* @swagger
* /users/login:
*   post:
*     tags:
*       - users
*     summary: Login an user
*     description: Login user with both email and password
*     produces:
*       - application/json
*     parameters:
*       - name: body 
*         in: body
*         schema:
*           $ref: '#/definitions/user'
*           properties:
*              email:
*                type: string
*              password:
*                type: string
*         required:
*          - email
*          - password
*     responses:
*       200:
*         description: Logged in!
*/
router.post('/users/login', userController.login);

/**
* @swagger
* /users/profile:
*   get:
*     tags:
*       - users
*     summary: Show user info
*     description: Returns user info
*     produces:
*       - application/json
*     responses:
*       200:
*         description: users info
*         schema:
*           $ref: '#/definitions/user'
*/
router.get('/users/profile', userAuth.normalUser, (req, res, next) => {
  res.status(200).json(req.user);
});

/**
* @swagger
* /users/logout:
*   get:
*     tags:
*       - users
*     summary: Logout
*     description: Logout user
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Logged out!
*         schema:
*           $ref: '#/definitions/user'
*/
router.get('/users/logout', userController.logout);

module.exports = router;