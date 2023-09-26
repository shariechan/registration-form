const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'dbmaster'
})

module.exports.addEmployee = async ({FirstName, LastName, Age}) => {
    const queryStatement = 'INSERT INTO `Employees` (`FirstName`, `LastName`, `Age`) VALUES (?, ?, ?)';
    await connection.connect();
    const user = await connection.query(queryStatement, [FirstName, LastName, Age], (err, rows, fields) => {
        if (err) throw err
        return rows[0];
      })
    await connection.end()

    return user;

}

module.exports.getEmployee = async (employeeId) => {
    const queryStatement = 'SELECT * from `Employees` where `id` = ?';
    await connection.connect();
    const user = await connection.query(queryStatement, [employeeId], (err, rows, fields) => {
        if (err) throw err
        return rows[0];
      })
    await connection.end()

    return user;
}

module.exports.getEmployees = async () => {
    const queryStatement = 'SELECT * from `Employees`';
    await connection.connect();
    const users = await connection.query(queryStatement, (err, rows, fields) => {
        if (err) throw err
        return rows; 
      })
    await connection.end()

    return users;

}
