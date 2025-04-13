const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "krier.uscs.sussex.ac.uk",
  user: "kk544",
  password: "Mysql_627115",
  database: "kk544",
});

console.log(connection);
