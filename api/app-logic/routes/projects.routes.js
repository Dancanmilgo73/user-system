const express = require("express");
const {
	getAllProjects,
	getProjectById,
	addProject,
	updateProject,
	deleteProject,
	markAsComplete,
} = require("../controllers/projects.controller");
const { Authenticator, isAdmin } = require("../middlewares/Authenticator");
const router = express.Router();
// Get all proojects
router.route("/all").get(Authenticator, getAllProjects);
// Get a single project
router.route("/:id").get(Authenticator, getProjectById);
// Only admins can add aproject
router.route("/add").post(Authenticator, isAdmin, addProject);
// Only the admins can update a project
router.route("/:id").patch(Authenticator, isAdmin, updateProject);
// Only admins can delete a project
router.route("/:id").delete(Authenticator, isAdmin, deleteProject);
// Assign a project using a project id - Only for admins
router.route("/assign/:id");
// submit
router.route("/complete/:id").put(Authenticator, isAdmin, markAsComplete);
module.exports = router;
