const data = require('../JobsWithCompanies.json');
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
    connectionLimit: 20,
    queueLimit: 0
});

//Testing our connection
/*
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error getting connection from pool:', err);
        return;
    }
    console.log('Connected to the database using pool!');
    connection.query('SELECT 1', (err, results) => {
        connection.release(); // Release the connection back to the pool
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        console.log('Query results:', results);
    });
    connection.end();
});*/

async function insertJobs(){
    let con;
    try {
        con = await pool.getConnection();
        if (!con){
            throw new Error('Failed to get database connection');
        }
        for (const company in data){
            if (data.hasOwnProperty(company)){
                const jobs = data[company].hits;
                console.log("This is a test");
                //console.log(jobs);
                console.log(`Company: ${company}, Jobs:`,jobs);
                //Check that jobs is of type array, for error handling
                if (!Array.isArray(jobs)){
                    console.error("Jobs is not a list");
                    continue;
                } else {
                    for (const job of jobs){
                        const query = `INSERT INTO Jobs(Title, Company, Description, Location, Url) VALUES (?,?,?,?)`;
                        const jobTitle = job.title || 'Unknown';
                        const description = job.description || 'Unknown';
                        const location = job.location || 'Unknown';
                        const url = "https://uk.indeed.com/viewjob?jk=" + (job.id || 'Unknown');
                        try {
                            await con.query(query, [jobTitle, company, description, location, url]);
                        } catch (err){
                            console.error(`Error inserting job for company "${company}"`,err);
                        }
                    }
                }
            }
        }
        console.log('All jobs added');
        //con.release();
    } catch (err){
        console.error('Error'+err);
    } finally {
        if (con) con.release();
    }
};

//Call the function
insertJobs();
