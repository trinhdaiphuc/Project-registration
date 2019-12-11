const express = require("express");
const router = express.Router();
const { project } = require("../controllers");

router.get("/", project.projectPage);

module.exports = router;
