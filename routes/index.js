var express = require('express');
var router = express.Router();
const employeeModel = require('../database/employee');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test-sql', function(req, res, next) {
  res.send(process.env.MYSQL_HOST);
});

router.get('/test', async function(req, res, next) {
  const employees = await employeeModel.getEmployees();
  res.send(employees);
});

module.exports = router;
