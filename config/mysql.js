require("dotenv").config();
const fs = require("fs");
const path = require("path");

module.exports = {
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  ssl: !(
    process.env.DB_SSL_CA_FILE &&
    process.env.DB_SSL_KEY_FILE &&
    process.env.DB_SSL_CERT_FILE
  )
    ? null
    : {
        ca: fs.readFileSync(
          path.join(__dirname, `../${process.env.DB_SSL_CA_FILE}`)
        ),
        key: fs.readFileSync(
          path.join(__dirname, `../${process.env.DB_SSL_KEY_FILE}`)
        ),
        cert: fs.readFileSync(
          path.join(__dirname, `../${process.env.DB_SSL_CERT_FILE}`)
        )
      },
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};
