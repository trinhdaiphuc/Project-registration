const express = require("express");
const router = express.Router();
const { project } = require("../controllers");
const { requireLogin } = require("./user");

router.use(requireLogin);

router.get("/", project.projectPage);
router
  .route("/:id")
  .get(project.registerPage)
  .post(project.registerProject)
  .delete(project.deleteProject);

module.exports = router;
