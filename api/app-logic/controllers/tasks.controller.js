const mssql = require("mssql");
const sqlConfig = require("../db/dbConfig");
const _ = require("lodash");

const getAllTasks = async (req, res) => {
	try {
		const pool = await mssql.connect(sqlConfig);
		const data = await pool.request().execute("dbo.spTasks_GetAllTasks");
		// const tasks = data.recordset;
		// console.log(data.recordset[0]);
		const tasks = data.recordset.map((task) => {
			return {
				id: task.taskId,
				name: task.taskName,
				description: task.taskDescription,
				projectId: task.project_Id,
				userId: task.userId,
			};
		});
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};
const getTaskById = async (req, res) => {
	const { id } = req.params;
	try {
		const pool = await mssql.connect(sqlConfig);
		const data = await pool
			.request()
			.input("id", mssql.Int, id)
			.execute("dbo.spTasks_GetTask");
		const task = _.pick(data.recordset[0], [
			"taskName",
			"taskDescription",
			"project_Id",
			"userId",
		]);

		res.status(200).json(task);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};
const assignTask = async (req, res) => {
	try {
		const { id } = req.params;
		const { userId } = req.body;
		const pool = await mssql.connect(sqlConfig);
		const data = await pool
			.request()
			.input("taskId", mssql.Int, id)
			.input("userId", mssql.Int, userId)
			.execute("dbo.spTasks_AssignTask");
		res
			.status(200)
			.send({ message: `Task asingned to the user with the id of ${userId}: ${data}` });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};
const addTask = async (req, res) => {
	try {
		const { name, description, projectId } = req.body;
		const pool = await mssql.connect(sqlConfig);
		const data = await pool
			.request()
			.input("taskName", mssql.VarChar, name)
			.input("projectId", mssql.Int, projectId)
			.input("taskDescription", mssql.VarChar, description)
			.execute("dbo.spTasks_AddTask");
		res.status(200).send({ message: `Task created successfully` });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};
const deleteTask = async (req, res) => {
	try {
		const { id } = req.param;
		const pool = await mssql.connect(sqlConfig);
		const data = await pool
			.request()
			.input("id", mssql.Int, id)
			.execute("dbo.spTasks_DeleteTask");
		res.status(200).send({ message: `Task with id ${id} was deleted` });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};
const updateTask = async (req, res) => {
	const { newName, newDescription } = req.body;
	if (!newName && !newDescription)
		return res
			.status(401)
			.send({ message: "You have to provide the new details to be update" });
	try {
		const { id } = req.params;
		const pool = await mssql.connect(sqlConfig);
		const data = await pool
			.request()
			.input("id", mssql.Int, id)
			.execute("dbo.spTasks_GetTask");
		const task = _.pick(data.recordset[0], [
			"taskName",
			"taskDescription",
			"project_Id",
			"userId",
			"isCompleted",
			"isSubmitted",
		]);
		await pool
			.request()
			.input("id", mssql.Int, id)
			.input("name", mssql.VarChar, newName ? newName : task.taskName)
			.input("projectId", mssql.Int, task.project_Id)
			.input("userId", mssql.Int, task.userId)
			.input(
				"taskDescription",
				mssql.VarChar,
				newDescription ? newDescription : task.taskDescription
			)
			.input("isCompleted", mssql.Bit, task.isCompleted)
			.input("isSubmitted", mssql.Bit, task.isSubmitted)
			.execute("dbo.spTasks_UpdateTask");
		res.status(200).send({ message: `Task with id ${id} was updated` });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};
const submitAsComplete = async (req, res) => {
	try {
		const { id } = req.param;
		const pool = await mssql.connect(sqlConfig);
		await pool
			.request()
			.input("id", mssql.Int, id)
			.execute("dbo.spTasks_SubmitCompleteTask");
		res.status(200).send({ message: `Task with id ${id} marked as complete` });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

module.exports = {
	getAllTasks,
	getTaskById,
	assignTask,
	deleteTask,
	updateTask,
	submitAsComplete,
	addTask,
};
