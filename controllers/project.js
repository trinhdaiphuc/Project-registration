module.exports = {
  projectPage(req, res) {
    res.locals.navLink =
      '<a class="btn btn-primary" href="/logout"></i>&nbsp;&nbsp; LOGOUT</a>';
    res.locals.username = req.session.username;
    res.locals.connectionConfig = JSON.stringify(req.session.connectionConfig);
    res.render("project");
  },
};
