const express = require("express");
const router = express.Router();
const { user } = require("../controllers");

const isLogin = (req, res, next) => {
  if (req.session && req.session.user) {
    res.redirect("/projects");
  } else {
    next();
  }
};

router.requireLogin = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
};

router.get("/", isLogin, user.loginPage);
router
  .route("/login")
  .get(isLogin, user.loginPage)
  .post(isLogin, user.login);
router.get("/logout", router.requireLogin, user.logout);

module.exports = router;
