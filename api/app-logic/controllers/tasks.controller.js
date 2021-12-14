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
			.send({ message: `Task asingned to the user with the id of ${userId}` });
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
			.input("taskname", mssql.Int, name)
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
			.execute("dbo.spTasks_deleteTask");
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
		const { id } = req.param;
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
		await pool
			.request()
			.input("id", mssql.Int, id)
			.input('name', mssql.VarChar, newName ? newName : task.taskName)
			.input('description', mssql.VarChar,newDescription ? newDescription : task.description)
			.execute("dbo.spTasks_updateTask");
		res.status(200).send({ message: `Task with id ${id} was updated` });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};
const submitComplete = async (req, res) =>
{
	try {
		
	} catch (error) {
		
	}
}

module.exports = { getAllTasks, getTaskById, assignTask, deleteTask, updateTask, submitComplete, addTask };
