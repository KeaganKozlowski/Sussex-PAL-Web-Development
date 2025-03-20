//Wipe database of all data
var mysql = require('mysql2');

var con = mysql.createConnection({
    host: 'krier.uscs.sussex.ac.uk',
    user: 'kk544',
    password: 'Mysql_627115',
    database: 'kk544',
});

con.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
    //Query to get all table names
    const query = "SHOW TABLES";
    con.query(query, (err, results) => {
      if (err) throw err;
      //Loop through each table and truncate it
      results.forEach((row) => {
        const tableName = row[`Tables_in_${con.config.database}`];
        const truncateQuery = `TRUNCATE TABLE ${tableName}`;
        con.query(truncateQuery, (err) => {
          if (err) throw err;
          console.log(`Truncated table: ${tableName}`);
        });
      });
      //Close the connection
      con.end();
    });
  });