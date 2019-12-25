const mysql = require("mysql2");
const poolConnection = require("../models/index");
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
        req.flash("projectError", error.message);
        res.render("project", { message: req.flash("projectError") });
      } else {
        connection.query("CALL sp_infoProject", (error, results) => {
          if (results[0][0].error) {
            console.error("[ERROR]::: ", results[0][0].error);
            req.flash("projectError", results[0][0].error);
          }
          res.locals.projects = results[0];
          res.render("project", { message: req.flash("projectError") });
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
        req.flash("projectError", error.message);
        res.redirect("/projects");
      } else {
        connection.query("CALL sp_infoAProject(?)", [id], (error, results) => {
          if (error) {
            console.log("[INFO]:::: registerPage sp_infoAProject -> error", error);
            req.flash("projectError", error.message);
            res.redirect("/projects");
          } else if (results[0] && results[0][0].error) {
            console.error("[ERROR]::: ", results[0][0].error);
            req.flash("projectError", results[0][0].error);
            res.redirect("/projects");
          } else {
            res.locals.project = results[0][0];
            res.locals.project.username = user.username;
            connection.query(
              "CALL sp_infoGroupInProject(?,?)",
              [id, user.username],
              (error, results) => {
                if (error) {
                  console.log("[INFO]:::: registerPage sp_infoGroupInProject -> error", error);
                  req.flash("registerError", error.message);
                  res.redirect(`/projects/${id}`);
                  return;
                } else if (results[0][0].error) {
                  console.error("[ERROR]::: ", results[0][0].error);
                } else {
                  const teamInfo = {
                    group_id: results[0][0]._id,
                    group_name: results[0][0]._name,
                    student_1: results[0][0]._id_Student,
                    student_2: results[0][1]._id_Student,
                    student_3: results[0][2]._id_Student,
                  };
                  res.locals.project.teamInfo = teamInfo;
                }
                res.render("register", { message: req.flash("registerError") });
              },
            );
          }
          connection.end();
        });
      }
    });
  },
  registerProject(req, res) {
    res.locals.navLink = '<a class="btn btn-primary" href="/logout"></i>&nbsp;&nbsp; LOGOUT</a>';
    const student_1 = req.session.user.username;
    const student_2 = req.body.student_2;
    const student_3 = req.body.student_3;
    const group_name = req.body.group_name;
    const id = req.params.id;

    poolConnection.getConnection((err, connection) => {
      if (err) {
        console.error("[ERROR]:::: registerProject -> err", err);
        req.flash("projectError", error.message);
        res.redirect("/projects");
      } else {
        connection.query(
          "CALL sp_registerGroup(?,?,?,?,?)",
          [group_name, id, student_1, student_2, student_3],
          (error, results) => {
            console.log(
              "[INFO]:::: registerProject -> [group_name, id, student_1, student_2, student_3]",
              [group_name, id, student_1, student_2, student_3],
            );

            if (results[0][0].error) {
              console.error("[ERROR]::: result ", results[0][0].error);
            }
            connection.release();
            res.redirect(`/projects/${id}`);
          },
        );
      }
    });
  },
  deleteProject(req, res) {
    res.locals.navLink = '<a class="btn btn-primary" href="/logout"></i>&nbsp;&nbsp; LOGOUT</a>';
    const groupId = req.body.groupId;
    const id = req.params.id;

    poolConnection.getConnection((err, connection) => {
      if (err) {
        console.error("[ERROR]::: deleteProject ", err);
        req.flash("projectError", error.message);
        res.redirect("/projects");
      } else {
        connection.query("CALL sp_deleteGroupInProject(?,?)", [groupId, id], (error, results) => {
          if (results[0] && results[0][0].error) {
            console.error("[ERROR]::: sp_deleteGroupInProject ", results[0][0].error);
          } else {
            connection.release();
          }
          res.redirect(`/projects/${id}`);
        });
      }
    });
  },
};
