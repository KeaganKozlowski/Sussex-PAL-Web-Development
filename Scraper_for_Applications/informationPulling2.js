const mysql = require('mysql2');
const data = require('../JobsWithCompanies.json');

const connection = mysql.createConnection({
    host: 'krier.uscs.sussex.ac.uk',
    user: 'kk544',
    password: 'Mysql_627115',
    database: 'kk544'
});

async function insertJobs() {
    try {
        connection.connect((err) => {
            if (err) {
                console.error('Error connecting to the database:', err);
                return;
            }
            console.log('Connected to the database!');
        });

        for (const company in data) {
            if (data.hasOwnProperty(company)) {
                const jobs = data[company].hits;
                console.log(`Company: ${company}, Jobs:`, jobs);

                if (!Array.isArray(jobs)) {
                    console.error(`Jobs for company "${company}" is not a list. Skipping...`);
                    continue;
                }

                for (const job of jobs) {
                    const query = `INSERT INTO Jobs(Title, Company, Description, Location, Url) VALUES (?,?,?,?,?)`;
                    const jobTitle = job.title || 'Unknown';
                    const description = job.description || 'Unknown';
                    const location = job.location || 'Unknown';
                    const url = "https://uk.indeed.com/viewjob?jk=" + (job.id || 'Unknown');
                    connection.query(query, [jobTitle, company, description, location, url], (err, results) => {
                        if (err) {
                            console.error('Error inserting job:', err);
                        } else {
                            console.log('Job inserted:', results);
                        }
                    });
                }
            }
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        connection.end((err) => {
            if (err) {
                console.error('Error closing the connection:', err);
            } else {
                console.log('Connection closed.');
            }
        });
    }
}

// Call the function
insertJobs();