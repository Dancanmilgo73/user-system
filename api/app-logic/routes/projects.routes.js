const express = require('express');
const {getAllProjects, getProjectById, addProject, updateProject, deleteProject} = require('../controllers/projects.controller');
const { Authenticator, isAdmin } = require('../middlewares/Authenticator');
const router = express.Router();
// Get all proojects
router.route('/all').get(Authenticator, getAllProjects)
// Get a single project
router.route('/:id').get(Authenticator, getProjectById)
// Only admins can add aproject
router.route('/add').post(Authenticator, isAdmin, addProject)
// Only the admins can update a project
router.route('/update/:id').patch(Authenticator,isAdmin, updateProject)
// Only admins can delete a project
router.route('/delete/:id').delete(Authenticator, isAdmin, deleteProject)
// Assign a project using a project id - Only for admins
router.route('/assign/:id')
module.exports = router;