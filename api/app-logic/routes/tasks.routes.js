const express = require("express");
const {
	getAllTasks,
	getTaskById,
	addTask,
	updateTask,
	assignTask,
	deleteTask,
	submitAsComplete,
	sendEmailOnAssignedTask,
} = require("../controllers/tasks.controller");
const { Authenticator, isAdmin } = require("../middlewares/Authenticator");
const router = express.Router();
// Create a new tasks,,,only admins
router.route("/").post(Authenticator, isAdmin, addTask);

// Assign a task to a user,,,,only admin
router.route("/assign").post(Authenticator, isAdmin, assignTask);
// Update a task using id,,,only admins
router.route("/update/:id").post(Authenticator, isAdmin, updateTask);
// Delete a project,,,, only admins
router.route("/:id").delete(Authenticator, isAdmin, deleteTask);
// Get all the tasks
router.route("/").get(Authenticator, getAllTasks);
// Route accessible to the background email service
router.route("/emailservice").get(sendEmailOnAssignedTask);
// Sumbit task as complete
router.route("/submit/:id").get(Authenticator, submitAsComplete);
// Get one task using an id
router.route("/:id").get(Authenticator, getTaskById);
module.exports = router;
