const mysql = require("mysql2");
let connection = null;

module.exports = {
  loginPage(req, res) {
    res.render("login");
  },
  login(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const config = {
      host: process.env.DB_HOST,
      user: username,
      password: password,
      database: process.env.DB_DATABASE,
    };

    connection = mysql.createConnection(config);

    connection.connect((err) => {
      if (err !== null) {
        console.log("[INFO]:::: login -> err", err);
      }
    });

    req.session.username = username;
    req.session.connectionConfig = config;

    connection.end();
    res.redirect("/projects");
  },
  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error("[ERROR]::: Error when destroy session: ", err);
      } else {
        res.redirect("/");
      }
    });
  },
};
