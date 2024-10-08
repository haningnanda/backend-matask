require('dotenv').config();
const mongoose = require('mongoose');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');


const PORT = process.env.PORT || 3001;

var indexRouter = require('./routes/index');
var authRouter = require('./routes/authRoutes');
var projectRouter = require('./routes/projectRoutes');
var taskRouter = require('./routes/taskRoutes');

var app = express();

// Database connect 
mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
  console.log("Connected to Database");
})
.catch(()=>{
  console.log("Connection Failed");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', projectRouter);
app.use('/', taskRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
