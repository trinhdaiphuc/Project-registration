const mysql = require("mysql2");
let config = require("../config/mysql.js");

module.exports = {
  loginPage(req, res) {
    res.locals.navLink =
      '<a class="nav-link" href="/"><i class="fa fa-home"></i>&nbsp;&nbsp; HOMEPAGE</a>';
    res.render("login", { message: req.flash("loginMessage") });
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
        if (err.code == "ER_ACCESS_DENIED_ERROR") {
          console.error("[ERROR]:::: login -> err", err);
          req.flash("loginMessage", "Wrong username or password");
          res.status(401).redirect("/");
        } else {
          req.flash("loginMessage", "Internal server error");
          res.status(500).redirect("/");
        }
      } else {
        req.session.user = { username, password };
        res.redirect("/projects");
      }
    });
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
