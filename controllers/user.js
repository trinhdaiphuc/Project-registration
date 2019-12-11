const mysql = require("mysql2");
let connection = null;

module.exports = {
  loginPage(req, res) {
    res.render("login");
  },
  login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: username,
      password: password,
      database: process.env.DB_DATABASE,
    });

    connection.connect((err) => {
      if (err !== null) {
        console.log("[INFO]:::: login -> err", err);
      }
    });

    req.session.username = username;
    req.session.connectionConfig = connection.config;
    console.log("[INFO]:::: login -> req.session.threadId", req.session.connectionConfig);
    res.redirect("/projects");
  },
  logout(req, res) {
    if (connection !== null) {
      connection.end();
    }
    res.redirect("/");
  },
};
