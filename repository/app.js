const createError = require('http-errors');
const path = require('path');

const express = require('express');
const logger = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// Passport Config
require('./config/passport')(passport);

// DB Config and server connect
const db = require('./config/keys').mongoURI;
mongoose
  .connect('mongodb://localhost/yyy', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(function () {
    console.log('mongoose connection open');
  })
  .catch(function (err) {
    console.error(err);
  });

const app = express();
app.locals.pretty = app.get('env') === 'development'; // pretty print html

// view engine setup pug and static
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 1) GLOBAL MIDDLEWARES

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

// limits the amount of request a user can do in 1 hour from the same IP - Prevens DDOS attacks and Bruteforce attemps
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/users', limiter); // set the limiter to specified route(s)

// Body Parser, reading data from body into req.body
console.log('Yadda Yadda Yadda is now started in ' + process.env.NODE_ENV + ' mode');
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS (Cross Site Scripting Attacks)
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    // whitelist: ['duration', 'ratingsQuantity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price'],
  })
);

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  // console.log(req.cookies);
  next();
});

// Express session
app.use(
  require('express-session')({
    // passport initialize
    secret: 'ioeruir!rznbzvmn8768576hdsw&%', // do the keyboard cat
    resave: true, // to create entropy
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/alt', require('./routes/alt.js'));
app.use('/users', require('./routes/users.js'));

// Error log in postman
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// global error handler
app.use(globalErrorHandler);

//moment
app.locals.moment = require('moment');

/*
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
*/

module.exports = app;
