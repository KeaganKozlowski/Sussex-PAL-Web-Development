console.log("Environment Variables:")
console.log("User:", process.env.USER);
console.log("Password:", process.env.PASSWORD);

const mysql = require('mysql2/promise');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

let pool;

if (!process.env.USER || !process.env.PASSWORD) {
    console.error("Error: USER or PASSWORD environment variables are not set.");
    pool = mysql.createPool({
        host: 'krier.uscs.sussex.ac.uk',
        user: 'kk544',
        password: 'Mysql_627115',
        database: 'kk544',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
    
} else {
    pool = mysql.createPool({
        host: 'krier.uscs.sussex.ac.uk',
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: 'kk544',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
}
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/check-login', (req, res) => {
    res.json({
        user: process.env.USER,
        password: process.env.PASSWORD ? '[HIDDEN]' : 'undefined'
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


//Shutdown process
const shutdown = () => {
    console.log('Shutting down server...');
    server.close(() => {
        console.log('HTTP server closed.');
        pool.end().then(() => {
            console.log('MySQL pool closed.');
            process.exit(0);
        }).catch(err => {
            console.error('Error closing MySQL pool:', err);
            process.exit(1);
        });
    });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
