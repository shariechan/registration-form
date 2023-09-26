var express = require('express');
var router = express.Router();
const employeeModel = require('../database/employee');

/* GET home page. */
router.get('/view', function(req, res, next) {
    res.render('employees', { title: 'Employees' });
});

router.get('/', async function(req, res, next) {
    const employees = await employeeModel.getEmployees();
    res.send(employees);
});

router.get('/:id', async function(req, res, next) {
    const employee = await employeeModel.getEmployee(req.params.id);
    console.log("🚀 ~ file: employees.js:17 ~ router.get ~ employee:", employee);
    res.status(200).send(employee, 200);
})

router.post('/', async function(req, res, next) {
    const employee = await employeeModel.addEmployee(req.body);
    res.send(employee, 201);

})
module.exports = router;
