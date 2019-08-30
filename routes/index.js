var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var util = require("util");
var md5 = require("md5");

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'library',
});
connection.connect();

connection.query = util.promisify(connection.query);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { 
    title: 'Express',
    name: 'Hamid Semix' 
  });
});

router.post('/', async (req, res, next) => {

  // validate every field accordingly
  
  let username = req.body.username;
  let password = req.body.password;

  if (username !== "" && password !== "") {

    let user = {
      username:   username,
      password:   md5(password),
    };
    var queryUser = await connection.query("SELECT * FROM `users` WHERE `email` = ? or `username` = ? LIMIT 1", [user.username, user.username]);
    if (queryUser.length > 0) {
      if (user.password == queryUser[0].password) {
        // login the user
        return res.redirect("/home");
      } else {
        return res.send({ app_status: false, message: "Wrong Username / or and Password combination" });
      }
    } else {
      return res.send({ app_status: true, message: "User doesn't exist" });
    }


  } else {
    // return an error { app_status: false, message: 'some message' }
    return res.send({ app_status: false, message: 'All fields are required to proceed!' });
  }
});

router.post('/register', async (req, res, next) => {

  // validate every field accordingly
  
  let username = req.body.username;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let password = req.body.password;

  if (username !== "" && firstname !== "" && lastname !== "" && email !== "" && password !== "") {
    if (password.length < 6 || password.length > 100) {
      return res.send({ app_status: false, message: "Password should be atleast 6 characters and not more than 100 characters" });
    } else {
      let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (regex.test(email)) {
        let user = {
          username:   username,
          first_name: firstname,
          last_name:  lastname,
          email:      email,
          password:   md5(password),
        };
        var queryUser = await connection.query("SELECT * FROM `users` WHERE `email` = ? or `username` = ?", [user.email, user.username]);
        if (queryUser.length > 0) {
          return res.send({ app_status: false, message: 'Email or Username already exists!' });
        } else {
          var query = connection.query("INSERT INTO users SET ?", user);
          if (query) {
            return res.send({ app_status: true, message: "User created" });
          } else {
            query.catch(err => {
              console.log(err);
            });
          }
        }
        
      } else {
        return res.send({ app_status: false, message: "Please provide a valid email address" });
      }
    }
  } else {
    // return an error { app_status: false, message: 'some message' }
    return res.send({ app_status: false, message: 'All fields are required to proceed!' });
  }
});

module.exports = router;
