const express = require("express");
const router = express.Router();
const { project } = require("../controllers");
const { requireLogin } = require("./user");

router.get("/", requireLogin, project.projectPage);
router.get("/:id", requireLogin, project.registerPage);
router.post("/:id", requireLogin, project.registerProject);

module.exports = router;
