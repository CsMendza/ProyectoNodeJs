const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'taller de node.js s.a.de c.v'
});

pool.query=util.promisify(pool.query);
module.exports = pool;