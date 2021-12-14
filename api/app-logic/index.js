require("dotenv").config();
const express = require("express");
const app = express();
const port = 3002;
const projects = require("./routes/projects.routes");
const tasks = require("./routes/tasks.routes");
const mssql = require("mssql");

const cors = require("cors");
const sqlConfig = require("./db/dbConfig");
// const { sqlConfig } = require("../auth_service/db/config");
// const { sqlConfig } = require('./db/config');

app.use(cors());
app.use(express.json());

mssql.connect(sqlConfig).then((pool) => {
	if (pool.connected) {
		console.log("Connected");
	}
});

// app.use('/user', user);
app.use("/projects", projects);
app.use("/tasks", tasks);

app.listen(port, () => {
	console.log(`App logic listening at http://localhost:${port}`);
});
