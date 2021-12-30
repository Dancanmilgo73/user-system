require("dotenv").config();
const mssql = require("mssql");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { sqlConfig } = require("../db/config");

const registerUser = async (req, res, next) => {
	const checkForLength = new RegExp("^(?=.{8,})");
	const checkForSymbols = new RegExp("^(?=.*[!@#$%^&*])");
	const checkForCapsLettersNumbers = new RegExp(
		"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])"
	);

	try {
		const { email, username, password, confirmPassword } = req.body;
		if (!email || !username || !password || !confirmPassword)
			return res.status(401).send({ message: "fill in all credentials" });

		if (password !== confirmPassword)
			return res.status(401).send({ message: "Confirm password do not match" });
		if (!checkForLength.test(password))
			return res
				.status(401)
				.send({ message: "Password must be atleast 8 characters long " });

		if (!checkForSymbols.test(password))
			return res
				.status(401)
				.send({ message: "Password must contain atleast 1 symbol" });

		if (!checkForCapsLettersNumbers.test(password))
			return res.status(401).send({
				message: "Password must contain small, letters caps and numbers",
			});
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = { email, name: username, password: hashedPassword };
		// console.log(user);
		const pool = await mssql.connect(sqlConfig);
		const result = await pool
			.request()
			.input("username", mssql.VarChar, user.name)
			.input("email", mssql.VarChar, user.email)
			.input("password", mssql.VarChar, user.password)
			.execute("dbo.spUsers_AddUser");
		//   .catch(err=> res.status(401).send({message: "email already in use"}));
		// res.status(201).send({ message: "User was added" });
		next();
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const pool = await mssql.connect(sqlConfig);
		const data = await pool
			.request()
			.input("email", mssql.VarChar, email)
			.execute("dbo.spUsers_SelectUser");
		const user = data.recordset[0];
		// console.log(user);
		if (!user) return res.status(401).send({ message: "User not found" });
		bcrypt.compare(password, user.password, (err, result) => {
			if (err) return res.status(401).send({ message: err.message });
			if (!result)
				return res.status(401).send({ message: "Wrong credentials" });

			const token = JWT.sign(
				{
					user: user.username,
					password: user.password,
					email: user.email,
					roleId: user.RoleId,
				},
				process.env.SECRET_KEY,
				{ expiresIn: "1h" }
			);
			return res.json({
				accessToken: token,
				user: {
					name: user.username,
					roleId: user.RoleId,
					id: user.userId,
					projectId: user.projectId,
				},
			});
		});
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
};

const updateUser = async (req, res) => {
	const { user, newPassword, newEmail, newUserName, email } = req.body;
	// if(!newPassword || !newEmail || !newUserName) return res.status(400).send({message: "Not Details to update were passed in"})
	try {
		const pool = await mssql.connect(sqlConfig);
		const data = await pool
			.request()
			.input("email", mssql.VarChar, email)
			.execute("dbo.spUsers_LoginUser");
		const response = data.recordset[0];
		// console.log(response);
		const hashedPassword = newPassword && (await bcrypt.hash(newPassword, 10));

		await pool
			.request()
			.input("id", mssql.Int, response.userId)
			.input(
				"username",
				mssql.VarChar,
				newUserName ? newUserName : response.username
			)
			.input("email", mssql.VarChar, newEmail ? newEmail : response.email)
			.input(
				"password",
				mssql.VarChar,
				hashedPassword ? hashedPassword : response.password
			)
			.input("roleId", mssql.Int, response.roleId)
			.execute("dbo.spUsers_UpdateUser");
		if (user.roleId !== 1) {
			const token = JWT.sign(
				{
					user: newUserName ? newUserName : response.username,
					password: hashedPassword ? hashedPassword : response.password,
					email: newEmail ? newEmail : response.email,
				},
				process.env.SECRET_KEY,
				{ expiresIn: "1h" }
			);
			return res
				.status(200)
				.send({ message: "details updated", accessToken: token });
		}
		res.status(200).send({
			message: `Details for the user with email ${email} were updated by admin`,
		});
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
};
const deleteUser = async (req, res) => {
	// const { user, email } = req.body;
	const { email } = req.params;
	try {
		const pool = await mssql.connect(sqlConfig);
		await pool
			.request()
			.input("email", mssql.VarChar, email)
			.execute("dbo.spUsers_DeleteUser");
		res.status(200).send({ message: "Deleted successsfully" });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};
const getAllUsers = async (req, res) => {
	try {
		const pool = await mssql.connect(sqlConfig);
		const data = await pool.request().execute("dbo.spUsers_GetAllUsers");
		res.status(200).json(data);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};
const sendSMSOnRegister = async (req, res) => {
	try {
		const pool = await mssql.connect(sqlConfig);
		const data = await pool.request().execute("dbo.spUsers_sendSMSOnRegister");
		res.status(200).json(data.recordset);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};
module.exports = {
	registerUser,
	loginUser,
	updateUser,
	deleteUser,
	getAllUsers,
	sendSMSOnRegister,
};
