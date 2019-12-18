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
        Promise.all([]).then();
        connection.query("CALL sp_infoAProject(?)", [id], (error, results, fields) => {
          if (error || results[0][0].error) {
            return console.error(error || results[0][0].error);
          } else {
            res.locals.project = results[0][0];
            res.locals.project.username = user.username;
            connection.query(
              "CALL sp_infoGroupInProject(?,?)",
              [id, user.username],
              (error, results, fields) => {
                if (error || results[0][0].error) {
                  console.error("[ERROR]:: ", error || results[0][0].error);
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
                res.render("register");
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
        console.error("[ERROR]:::: err", err);
      } else {
        console.log(`Database connected with threadId: ${connection.threadId}`);
        console.log(
          "[INFO]:::: registerProject -> [group_name, id, student_1, student_2, student_3]",
          [group_name, id, student_1, student_2, student_3],
        );

        connection.query(
          "CALL sp_registerGroup(?,?,?,?,?)",
          [group_name, id, student_1, student_2, student_3],
          (error, results, fields) => {
            if (error) {
              return console.error(error);
            }
            console.log("[INFO]:::: registerProject -> results", results[0]);
            connection.release();
            res.status(200).redirect(`/projects/${id}`);
          },
        );
      }
    });
  },
  deleteProject(req, res) {
    res.locals.navLink = '<a class="btn btn-primary" href="/logout"></i>&nbsp;&nbsp; LOGOUT</a>';
    const studentId = req.body.studentId;
    console.log("[INFO]:::: deleteProject -> studentId", studentId);
    const groupId = req.body.groupId;
    console.log("[INFO]:::: deleteProject -> groupId", groupId);
    const id = req.params.id;
    console.log("[INFO]:::: deleteProject -> id", id);

    poolConnection.getConnection((err, connection) => {
      if (err) {
        console.error("[ERROR]:::: err", err);
      } else {
        console.log(`Database connected with threadId: ${connection.threadId}`);
        connection.query(
          "CALL sp_deleteGroupInProject(?,?)",
          [groupId, id],
          (error, results, fields) => {
            if (error || results[0][0].error) {
              return console.error(error || results[0][0].error);
            } else {
              console.log("[INFO]:::: registerProject -> results", results[0]);
              connection.release();
              res.status(200).redirect(`/projects/${id}`);
            }
          },
        );
      }
    });
  },
};
