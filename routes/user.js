const express = require("express");
const router = express.Router();
const { user } = require("../controllers");

router.requireLogin = (req, res, next) => {
  if (req.session && req.session.username) {
    next();
  } else {
    res.redirect("/");
  }
};

router.get("/", user.loginPage);
router.post("/login", user.login);
router.get("/logout", user.logout);

module.exports = router;
