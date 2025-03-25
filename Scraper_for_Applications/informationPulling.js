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
    connectionLimit: 10,
    queueLimit: 0
});

async function insertJobs(){
    try {
        const con = await pool.getConnection();
        for (const company in data){
            if (data.hasOwnProperty(company)){
                const jobs = data[company];
                for (const job of jobs){
                    const query = `INSERT INTO Jobs(Title, Company, Location, Url) VALUES (?,?,?,?)`;
                    const jobTitle = job.title || 'Unknown';
                    const location = job.location || 'Unknown';
                    const url = "https://uk.indeed.com/viewjob?jk=" + job.id || 'Unknown';
                    await con.query(query, [company, jobs, location, url]);
                }
            }
        }
        console.log('All jobs added');
        con.release();
    } catch (err){
        console.error('Error'+err);
    }
};

//Call the function
insertJobs();
