module.exports = {
  projectPage(req, res) {
    res.locals.username = req.session.username;
    res.locals.connectionConfig = JSON.stringify(req.session.connectionConfig);
    res.render("project");
  },
};
