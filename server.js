console.log("User:", process.env.USER);
console.log("Password:", process.env.PASSWORD);

const mysql = require('mysql2/promise');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const pool = mysql.createPool({
    host: 'your_database_host',
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: 'your_database_name',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});