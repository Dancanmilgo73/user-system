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
module.exports = { getAllTasks, getTaskById };
