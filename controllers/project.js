const mysql = require("mysql2");
let config = require("../config/mysql.js");
delete config.connectionLimit;

module.exports = {
  projectPage(req, res) {
    res.locals.navLink = '<a class="btn btn-primary" href="/logout"></i>&nbsp;&nbsp; LOGOUT</a>';
    const user = req.session.user;
    config.user = user.username;
    config.password = user.password;
    const connection = mysql.createConnection(config);
    connection.connect((err) => {
      if (err) {
        console.error(`[ERROR]::: error when connect to user ${req.session.username}, ${err}`);
      } else {
        connection.query("CALL sp_infoProject", (error, results, fields) => {
          if (error) {
            return console.error(error.message);
          }
          res.locals.projects = results[0];
          res.render("project");
          connection.end();
        });
      }
    });
  },
  registerPage(req, res) {
    res.locals.navLink = '<a class="btn btn-primary" href="/logout"></i>&nbsp;&nbsp; LOGOUT</a>';
    const id = req.params.id;
    const user = req.session.user;
    config.user = user.username;
    config.password = user.password;
    const connection = mysql.createConnection(config);
    connection.connect((err) => {
      if (err) {
        console.error(`[ERROR]::: error when connect to user ${req.session.username}, ${err}`);
      } else {
        connection.query("CALL sp_infoAProject(?)", [id], (error, results, fields) => {
          if (error) {
            return console.error(error.message);
          }
          res.locals.user = user;
          res.locals.project = results[0];
          res.render("register");
          connection.end();
        });
      }
    });
  },
  registerProject(req, res) {
    res.locals.navLink = '<a class="btn btn-primary" href="/logout"></i>&nbsp;&nbsp; LOGOUT</a>';
    const student_1 = req.body.student_1;
    const student_2 = req.body.student_2;
    const student_3 = req.body.student_3;
    const id = req.body.id;
    console.log("[INFO]:::: registerProject -> body", { student_1, student_2, student_3 });
    res.status(200).redirect(`/projects/${id}`);
  },
};
