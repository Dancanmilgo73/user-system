import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../redux/actions/projects.actions";
import Button from "@mui/material/Button";
import { assignTask, getTasks } from "../redux/actions/tasks.action";
import CreateProject from "./CreateProject";

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

function Row(props) {
	const dispatch = useDispatch();

	const { project } = props;
	useEffect(() => {
		dispatch(getTasks());
	}, [dispatch, project]);
	const { tasks } = useSelector((state) => state.tasks);
	const projectTasks = tasks.filter((task) => task.projectId === project.id);
	const [open, setOpen] = React.useState(false);
	// console.log(projectTasks);

	return (
		<React.Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell>
					<IconButton
						aria-label='expand row'
						size='small'
						onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component='th' scope='row'>
					{project.name}
				</TableCell>
				<TableCell align='right'>Completed</TableCell>
				<TableCell align='right' style={{}}>
					{project.description}
				</TableCell>
				{/* <TableCell align='right'>{row.carbs}</TableCell> */}
				{/* <TableCell align='right'>{row.protein}</TableCell> */}
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout='auto' unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant='h6' gutterBottom component='div'>
								Tasks
							</Typography>
							<Table size='small' aria-label='purchases'>
								<TableHead>
									<TableRow>
										<TableCell>Name</TableCell>
										<TableCell>Status</TableCell>
										<TableCell align='right'>Description</TableCell>
										{/* <TableCell align='right'>Total price ($)</TableCell> */}
									</TableRow>
								</TableHead>
								<TableBody>
									{projectTasks.map((task) => (
										<TableRow key={task.name}>
											<TableCell component='th' scope='row'>
												{task.name}
											</TableCell>
											{/* <TableCell>{task.customerId}</TableCell> */}
											<TableCell>UnAssigned</TableCell>
											<TableCell align='right'>{task.description}</TableCell>
											<TableCell align='right'>
												<Button variant='contained'>Assign</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
							<Button variant='contained' align='right' onClick={()=>dispatch(assignTask())}>
								Create New Task
							</Button>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
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
	}, [dispatch, projects]);

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
							<Row key={project.name} project={project} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
