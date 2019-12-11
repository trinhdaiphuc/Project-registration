const express = require("express");
const router = express.Router();
const { user } = require("../controllers");
router.get("/", user.loginPage);
router.post("/login", user.login);
router.get("/logout", user.logout);

module.exports = router;
