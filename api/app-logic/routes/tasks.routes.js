const express = require("express");
const { getAllTasks, getTaskById } = require("../controllers/tasks.controller");
const { Authenticator, isAdmin } = require("../middlewares/Authenticator");
const router = express.Router();
// Create a new tasks,,,only admins
router.route("/");
// Get all the tasks
router.route("/").get(Authenticator, getAllTasks);
// Get one task using an id
router.route("/:id").get(getTaskById);
// Update a task using id,,,only admins
router.route("/update/:id");
// Assign a task to a user,,,,only admin
router.route("/assign/:id");
// Delete a project,,,, only admins
router.route("/delete/:id");
module.exports = router;
