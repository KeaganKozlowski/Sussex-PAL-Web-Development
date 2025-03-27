//Code for all centralized project will go for the serverside stuff on the backend
///Definitions
var mysql = require('mysql2');

///Connection
const con = mysql.createConnection({
    host: 'krier.uscs.sussex.ac.uk',
    user: 'kk544',
    password: 'Mysql_627115',
    database: 'kk544'
});

///Wipe Server
function wipeServer(con) {
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database');
        //Query to get all table names
        const query = "SHOW TABLES";
        con.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching table names:', err);
                con.end();
                return;
            }
            //Loop through each table and truncate it
            results.forEach((row) => {
                const tableName = row[`Tables_in_${con.config.database}`];
                const truncateQuery = `TRUNCATE TABLE ${tableName}`;
                con.query(truncateQuery, (err) => {
                    if (err) {
                        console.error(`Error truncating table ${tableName}:`, err);
                    } else {
                        console.log(`Truncated table: ${tableName}`);
                    }
                });
            });
            //Close the connection after all tables are truncated
            con.end((err) => {
                if (err) {
                    console.error('Error closing the connection:', err);
                } else {
                    console.log('Connection closed');
                }
            });
        });
    });
}

///
