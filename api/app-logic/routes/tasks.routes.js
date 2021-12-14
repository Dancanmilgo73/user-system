const express = require("express");
const { getAllTasks, getTaskById, addTask, updateTask, assignTask, deleteTask } = require("../controllers/tasks.controller");
const { Authenticator, isAdmin } = require("../middlewares/Authenticator");
const router = express.Router();
// Create a new tasks,,,only admins
router.route("/").post(Authenticator, isAdmin, addTask);
// Get all the tasks
router.route("/").get(Authenticator, getAllTasks);
// Get one task using an id
router.route("/:id").get(Authenticator, getTaskById);
// Update a task using id,,,only admins
router.route("/update/:id").post(Authenticator, isAdmin, updateTask);
// Assign a task to a user,,,,only admin
router.route("/assign/:id").post(Authenticator, isAdmin, assignTask);
// Delete a project,,,, only admins
router.route("/delete/:id").post(Authenticator,isAdmin, deleteTask);
module.exports = router;
