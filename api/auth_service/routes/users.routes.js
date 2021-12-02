const express = require('express');
const { registerUser, loginUser, updateUser } = require('../controllers/users.controller');
const { Authenticator } = require('../middlewares/Authenticator');
const router = express.Router();

router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.route('/update').patch(Authenticator, updateUser)
module.exports = router;