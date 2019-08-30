var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('home.html', { 
      title: 'Library'
    });
});

module.exports = router;