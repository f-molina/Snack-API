var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var swaggerJSDoc = require('./middlewares/swagger');
var engine = require('ejs-mate');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');

require('dotenv').config();

//db
mongoose.connect(`mongodb://${process.env.USERDB}:${process.env.PASSDB}@ds241977.mlab.com:41977/snacks`, {
  useNewUrlParser: true
}).then(db => console.log("DB connected"))
  .catch(err => console.log(err));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

var app = express();
require('./passport/auth');

swaggerJSDoc(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.user = req.user;
  console.log(app.locals)
  next();
});

app.use('/', indexRouter);
app.use('/api/v1', usersRouter);
app.use('/api/v1', productsRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
