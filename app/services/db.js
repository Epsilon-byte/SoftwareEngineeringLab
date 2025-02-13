// db.js is handling the backend of the web application

require("dotenv").config();

// A Promise is an object representing the eventual completion or failure of an asynchronous operation
const mysql = require('mysql2/promise');

const config = {
  db: { /* do not put password or any sensitive info here, done only for demo */
    host: process.env.DB_CONTAINER,
    port: process.env.DB_PORT,
    user: process.env.MYSQL_ROOT_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0,
  },
};
  
const pool = mysql.createPool(config.db);

// Utility function to query the database
// Handles sending a query to the database
async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);

  return rows;
}

module.exports = {
  query,
}