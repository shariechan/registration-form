const mysql = require('mysql2/promise');

const mysqlCreateConnection = () => {
    const connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT || 3306,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: 'dbmaster'
    })

    return connection;
}

module.exports.addEmployee = async ({FirstName, LastName, Age}) => {
    const queryStatement = 'INSERT INTO `Employees` (`FirstName`, `LastName`, `Age`) VALUES (?, ?, ?)';
    const connection = await mysqlCreateConnection();
    const user = await connection.execute(queryStatement, [FirstName, LastName, Age], (err, rows, fields) => {
        if (err) throw err
        return rows[0];
      })
    await connection.end()

    return user;

}

module.exports.getEmployee = async (employeeId) => {
    const queryStatement = 'SELECT * from `Employees` where `id` = ?';
    const connection = await mysqlCreateConnection();
    console.log("🚀 ~ file: employee.js:31 ~ module.exports.getEmployee= ~ connection:", connection);
    const [rows, fields] = await connection.execute(queryStatement, [employeeId]);
    await connection.end()

    return rows;
}

module.exports.getEmployees = async () => {
    const queryStatement = 'SELECT * from `Employees`';

    const connection = await mysqlCreateConnection();

    const [rows, fields] = await connection.execute(queryStatement);
    
    await connection.end()

    return rows;

}
