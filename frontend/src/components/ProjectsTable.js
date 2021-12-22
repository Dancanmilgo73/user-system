import React, { useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../redux/actions/projects.actions";
import Button from "@mui/material/Button";
import {
	addTask,
	assignTask,
	deleteTask,
	getTasks,
} from "../redux/actions/tasks.action";
import CreateProject from "./CreateProject";
import CreateTask from "./CreateTask";
import AssignTask from "./AssignTask";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskList from "./TasksList";

function createData(name, calories, fat, carbs, protein, price) {
	return {
		name,
		calories,
		fat,
		carbs,
		protein,
		price,
		history: [
			{
				date: "UI",
				customerId: "In Progress",
				amount: "Dancan N",
			},
			{
				date: "Back end",
				customerId: "completed",
				amount: "John Doe",
			},
		],
	};
}

// Row.propTypes = {
// 	row: PropTypes.shape({
// 		calories: PropTypes.number.isRequired,
// 		carbs: PropTypes.number.isRequired,
// 		fat: PropTypes.number.isRequired,
// 		history: PropTypes.arrayOf(
// 			PropTypes.shape({
// 				amount: PropTypes.number.isRequired,
// 				customerId: PropTypes.string.isRequired,
// 				date: PropTypes.string.isRequired,
// 			})
// 		).isRequired,
// 		name: PropTypes.string.isRequired,
// 		price: PropTypes.number.isRequired,
// 		protein: PropTypes.number.isRequired,
// 	}).isRequired,
// };

const rows = [
	createData("XYZ Company Website", "completed", 12),
	createData("Perl Motors", "In progress", 30),
	createData("Project Management Sytem", "In progress", 1),
];

export default function ProjectsTable() {
	const dispatch = useDispatch();
	const { projects, loading } = useSelector((state) => state.projects);
	console.log(projects);
	useEffect(() => {
		dispatch(getProjects());
	}, [dispatch]);

	return (
		<>
			<CreateProject />
			<TableContainer component={Paper}>
				{/* <Button variant='contained'>Create New Project</Button> */}
				<Table aria-label='collapsible table'>
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>ProjectName</TableCell>
							<TableCell align='right'>Status</TableCell>
							<TableCell align='right'>Project Id</TableCell>
							{/* <TableCell align='right'>Carbs&nbsp;(g)</TableCell> */}
							{/* <TableCell align='right'>Protein&nbsp;(g)</TableCell> */}
						</TableRow>
					</TableHead>
					<TableBody>
						{projects?.map((project) => (
							// <TaskList key={project.id} project={project} />
							<TableRow>
								<TableCell />
								<TableCell>{project.name}</TableCell>
								<TableCell align='right'>In Progress</TableCell>
								<TableCell align='right'>{project.id}</TableCell>
								<TableCell align='right'>
									<Button variant='outlined'>View Tasks</Button>
								</TableCell>
								{/* <TableCell align='right'>Protein&nbsp;(g)</TableCell> */}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
