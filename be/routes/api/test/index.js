var createError = require('http-errors');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/hello', function(req, res, next) {
  res.send({ a: 222 });
});

router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없어요...'));
});

module.exports = router;
