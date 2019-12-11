require("dotenv").config();
module.exports = {
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};
