const mssql = require("mssql");
const sqlConfig = require("../db/dbConfig");

const getAllProjects = async (req, res) => {
	try {
		const pool = await mssql.connect(sqlConfig);
		const data = await pool.request().execute("dbo.spProjects_GetAllProjects");
		const projects = data.recordset;
		const response = projects.map((project) => {
			return {
				id: project.projectId,
				name: project.projectName,
				description: project.projectDescription,
				isCompleted: project.isCompleted,
			};
		});
		res.status(200).json(response);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};
const getProjectById = async (req, res) => {
	const { id } = req.params;
	try {
		const pool = await mssql.connect(sqlConfig);
		const data = await pool
			.request()
			.input("id", mssql.Int, id)
			.execute("dbo.spProjects_GetProject");
		const project = data.recordset;
		const response = project.map((project) => {
			return {
				id: project.projectId,
				name: project.projectName,
				description: project.projectDescription,
			};
		});
		res.status(200).json(response);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};
const addProject = async (req, res) => {
	const { name, description } = req.body;
	// console.log("hello");
	console.log(req.body);
	if (!name)
		return res
			.status(401)
			.send({ message: "The name of the project is required" });
	try {
		const pool = await mssql.connect(sqlConfig);
		await pool
			.request()
			.input("name", mssql.VarChar, name)
			.input("description", mssql.VarChar, description)
			.execute("dbo.spProjects_AddProject");
		res.status(200).send({ message: "Project was added" });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};
const updateProject = async (req, res) => {
	const { id } = req.params;
	const { name, description } = req.body;
	console.log(id, name, description);
	if (!name && !description)
		return res
			.status(401)
			.send({ message: "You must include details to be updated" });
	try {
		const pool = await mssql.connect(sqlConfig);
		const data = await pool
			.request()
			.input("id", mssql.Int, id)
			.execute("dbo.spProjects_GetProject");
		const project = data.recordset[0];
		await pool
			.request()
			.input("id", mssql.Int, id)
			.input("name", mssql.VarChar, name ? name : project.projectName)
			.input(
				"Description",
				mssql.VarChar,
				description ? description : project.projectDescription
			)
			.execute("dbo.spProjects_Update ");
		res.status(200).send({ message: "Details updated successfully" });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};
const deleteProject = async (req, res) => {
	const { id } = req.params;
	try {
		const pool = await mssql.connect(sqlConfig);
		const data = await pool
			.request()
			.input("id", mssql.Int, id)
			.execute("dbo.spProjects_Delete");
		res.status(200).json(data);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};
const markAsComplete = async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;
		const pool = await mssql.connect(sqlConfig);
		if (status === "complete") {
			const data = await pool
				.request()
				.input("id", mssql.Int, id)
				.execute("dbo.spProjects_MarkAsComplete");
			console.log(data.recordset[0]);
			if (
				data.recordset[0].message ===
				"Cannot complete project because of pending tasks"
			)
				return res.status(404).send({ message: data.recordset[0].message });
			res.status(200).json(data.recordset[0]);
		}
		if (status === "incomplete") {
			console.log(status, id);
			const data = await pool
				.request()
				.input("id", mssql.Int, id)
				.execute("dbo.spProjects_UnMarkAsComplete");
			res.status(200).json(data.recordset);
		}
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

module.exports = {
	getAllProjects,
	getProjectById,
	addProject,
	updateProject,
	deleteProject,
	markAsComplete,
};
