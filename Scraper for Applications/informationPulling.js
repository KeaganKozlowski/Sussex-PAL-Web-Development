const data = require('./JobsWithCompanies.json');
const mysql = require('mysql2')
console.log(data);

//Connect
///Using a pool as we want to perform multiple operations on a database
const pool = mysql.createPool({
    host: 'krier.uscs.sussex.ac.uk',
    user: 'kk544',
    password: 'Mysql_627115',
    database: 'kk544',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


