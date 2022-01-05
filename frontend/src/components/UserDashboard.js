import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { useSelector, useDispatch } from "react-redux";
import { getTasks, submitTask } from "../redux/actions/tasks.action";
import { getProjects } from "../redux/actions/projects.actions";
export default function UserDashboard() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getTasks());
		dispatch(getProjects());
	}, [dispatch]);

	const { tasks } = useSelector((state) => state.tasks);
	const { projects } = useSelector((state) => state.projects);

	const { userDetails } = useSelector((state) => state.auth);

	const userTasks = tasks.filter((task) => task.userId === userDetails.id);
	const userProject = projects.filter(
		(project) => project.id === userDetails.projectId
	);
	console.log(userProject);
	// console.log(userTasks);
	const handleChange = (e) => {
		if (e.target.checked) {
			dispatch(submitTask(e.target.value));
		}
	};

	return userProject.length ? (
		<div>
			<Typography
				component='h1'
				variant='h6'
				color='inherit'
				noWrap
				sx={{ flexGrow: 1 }}>
				{`You are currently working on ${userProject[0]?.name}`}
			</Typography>
			<hr />
			<p style={{ textAlign: "left" }}>
				<strong>Description:</strong>
				{userProject[0]?.description}
			</p>

			<Typography
				component='h6'
				variant='h6'
				color='inherit'
				noWrap
				sx={{ flexGrow: 1 }}>
				These are the tasks you are assigned to
			</Typography>
			<hr />
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell sx={{ fontWeight: "bold" }}>Task Name</TableCell>
							<TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
							<TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
							<TableCell sx={{ fontWeight: "bold" }} align='right'>
								Mark
							</TableCell>
							{/* <TableCell align='right'>Protein&nbsp;(g)</TableCell> */}
						</TableRow>
					</TableHead>
					<TableBody>
						{userTasks?.map((task) => (
							<TableRow
								key={task.id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell component='th' scope='row'>
									{task.name}
								</TableCell>
								<TableCell>{task.description}</TableCell>
								<TableCell sx={{ color: "green" }}>
									{task.isComplete
										? "complete"
										: !task.isComplete && task.isSubmitted
										? "Waiting for approval"
										: "In progress"}
								</TableCell>
								<TableCell align='right'>
									{task.isSubmitted ? (
										"Submitted"
									) : (
										<FormControlLabel
											control={
												<Checkbox
													color='success'
													onChange={handleChange}
													value={task.id}
												/>
											}
											label='Mark As Complete'
										/>
									)}
								</TableCell>
								{/* <TableCell align='right'>{row.protein}</TableCell> */}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	) : (
		<div>
			<Typography
				component='h6'
				variant='h6'
				color='inherit'
				noWrap
				sx={{ flexGrow: 1 }}>
				You are currently not assigned any project. Be on the look out on email
				for tasks that you will assigned
			</Typography>
		</div>
	);
}
