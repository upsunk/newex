var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const history = require('connect-history-api-fallback');
const cors = require('cors');

var app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use('/api', require('./routes/api'));
app.use(history());
app.use(express.static(path.join(__dirname, '../', 'fe', 'dist')));

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
  res.send({ msg: err.message });
});

module.exports = app;

const mongoose = require('mongoose');
// const User = require('./models/users');

mongoose.connect('mongodb://localhost:27017/nemv',  { useNewUrlParser: true }, (err) => {
  if (err) return console.error(err)
  console.log('mongoose connected')
  // User.deleteMany()
  //   .then(r => console.log(r))
  //   .catch(e => console.error(e))

  // User.create({ name: '하하' })
  // .then(r => console.log(r))
  // .catch(e => console.log(e))

  // User.find()
  //   .then(r => console.log(r))
  //   .catch(e => console.log(e))

  // User.updateOne({ _id: '5d0b4375704c4f2aa06ab02b' }, { $set: { age: 33 } })
  // .then(r => {
  //   console.log(r)
  //     console.log('update')
  //   return User.find()
  // })
  // .then(r => console.log(r))
  // .catch(e => console.log(e))

  // User.deleteOne({ _id: '5d0b4375704c4f2aa06ab02b' })
  //   .then(r => console.log(r))
  //   .catch(e => console.log(e))
})

