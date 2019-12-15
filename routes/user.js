const express = require("express");
const router = express.Router();
const { user } = require("../controllers");

router.requireLogin = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
};

router.isLogin = (req, res, next) => {
  if (req.session && req.session.user) {
    res.redirect("/projects");
  } else {
    next();
  }
};

router.get("/", router.isLogin, user.loginPage);
router.get("/login", router.isLogin, user.loginPage);
router.post("/login", router.isLogin, user.login);
router.get("/logout", user.logout);

module.exports = router;
