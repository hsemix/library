var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('profile.html');
});
router.get('/edit', function (req, res, next) {
  res.render('profile.html');
});

module.exports = router;
