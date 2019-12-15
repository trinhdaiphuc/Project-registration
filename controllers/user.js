const mysql = require("mysql2");
let config = require("../config/mysql.js");

module.exports = {
  loginPage(req, res) {
    res.locals.navLink =
      '<a class="nav-link" href="/"><i class="fa fa-home"></i>&nbsp;&nbsp; HOMEPAGE</a>';
    res.render("login");
  },
  login(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    delete config.connectionLimit;
    config.user = username;
    config.password = password;

    const connection = mysql.createConnection(config);

    connection.connect((err) => {
      if (err) {
        console.error("[ERROR]:::: login -> err", err);
      }
    });

    req.session.user = { username, password };

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
