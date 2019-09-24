var express = require('express');
var session = require('express-session');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.session.loggedin) {
    res.render('home.html', { 
      title: 'Library',
      page: 'Dashboard',
      user: req.session.auth_user,
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;