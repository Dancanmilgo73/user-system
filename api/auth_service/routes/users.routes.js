const express = require("express");
const {
	registerUser,
	loginUser,
	updateUser,
	deleteUser,
	getAllUsers,
	sendSMSOnRegister,
} = require("../controllers/users.controller");
const { Authenticator, isAdmin } = require("../middlewares/Authenticator");
const router = express.Router();
router
	.route("/")
	.get(
		Authenticator,
		getAllUsers
	); /* Only an admin can get a list of all users */
router.route("/login").post(loginUser);
router.route("/register").post(registerUser, loginUser);
// Only the admin and the user who owns the account can update one's details
router.route("/update").post(Authenticator, isAdmin, updateUser);
// Only the admin and the user who owns the account can delete ones details
router.route("/delete/:email").delete(Authenticator, isAdmin, deleteUser);
// Route accessible to the background email service
router.route("/emailservice").get(sendSMSOnRegister);
module.exports = router;
