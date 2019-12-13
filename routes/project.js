const express = require("express");
const router = express.Router();
const { project } = require("../controllers");
const { requireLogin } = require("./user");

router.get("/", requireLogin, project.projectPage);

module.exports = router;
