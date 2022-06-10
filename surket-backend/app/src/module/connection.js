/** setting koneksi ke database */

let { Client } = require("pg");

let connection = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

exports.connect = () => connection.connect();

exports.connection = connection;
