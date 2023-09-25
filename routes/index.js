var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/test', function(req, res, next) {
  let users = {};
  const mysql = require('mysql')
  const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'dbmaster'
  })

  connection.connect()

  connection.query('SELECT * from my Employees', (err, rows, fields) => {
    if (err) throw err

    users = rows;
    console.log('users', users);
    res.send(users);
  
  })
  connection.end()
});

module.exports = router;
