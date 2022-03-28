require("dotenv").config({ path: ".env" });
const mysql = require('mysql2');

//Datos de Conexión
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0
});


pool.getConnection((err, connection) => {
 if(err) throw err;
 console.log('Connected as id ' + connection.threadId)
});


module.exports = pool;
