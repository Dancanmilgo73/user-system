// import React, { useEffect } from "react";

// import { useDispatch, useSelector } from "react-redux";
// import { deleteTask, getTasks } from "../redux/actions/tasks.action";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import PropTypes from "prop-types";
// import Box from "@mui/material/Box";
// import Collapse from "@mui/material/Collapse";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CreateTask from "./CreateTask";
// import AssignTask from "./AssignTask";

// export default function TaskList(props) {
// 	const dispatch = useDispatch();

// 	const { project } = props;
// 	useEffect(() => {
// 		dispatch(getTasks());
// 	}, [dispatch, project]);
// 	const { tasks } = useSelector((state) => state.tasks);
// 	const projectTasks = tasks.filter((task) => task.projectId === project.id);

// 	const [open, setOpen] = React.useState(false);
// 	console.log(projectTasks);

// 	return (
// 		<React.Fragment>
// 			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
// 				<TableCell>
// 					<IconButton
// 						aria-label='expand row'
// 						size='small'
// 						onClick={() => setOpen(!open)}>
// 						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
// 					</IconButton>
// 				</TableCell>
// 				<TableCell component='th' scope='row'>
// 					{project.name}
// 				</TableCell>
// 				<TableCell align='right'>Completed</TableCell>
// 				<TableCell align='right' style={{}}>
// 					{project.description}
// 				</TableCell>

// 			</TableRow>

// 			<TableRow>
// 				<TableCell
// 					style={{
// 						paddingBottom: 0,
// 						paddingTop: 0,
// 						backgroundColor: "#deeefa",
// 					}}
// 					colSpan={6}>
// 					<Collapse in={open} timeout='auto' unmountOnExit>
// 						<Box sx={{ margin: 1 }}>
// 							<Typography variant='h6' gutterBottom component='div'>
// 								Tasks
// 								<CreateTask projectId={project.id} />
// 							</Typography>
// 							<Table size='small' aria-label='purchases'>
// 								{projectTasks.length ? (
// 									<TableHead>
// 										<TableRow>
// 											<TableCell>Name</TableCell>
// 											<TableCell>Status</TableCell>
// 											<TableCell>Description</TableCell>

// 										</TableRow>
// 									</TableHead>
// 								) : (
// 									<Typography
// 										component='h1'
// 										variant='h6'
// 										color='inherit'
// 										noWrap
// 										fullWidth
// 										align='center'
// 										sx={{ flexGrow: 1 }}>
// 										No Tasks currently created
// 									</Typography>
// 								)}
// 								<TableBody>
// 									{projectTasks.map((task) => {
// 										return (
// 											<TableRow key={task.id}>
// 												<TableCell component='th' scope='row'>
// 													{task.name}
// 												</TableCell>
// 												<TableCell>
// 													{task.userId ? "Assigned" : "UnAssigned"}
// 												</TableCell>
// 												<TableCell>{task.description}</TableCell>
// 												{task.userId === null ? (
// 													<TableCell align='right'>

// 														<AssignTask task={task} />
// 													</TableCell>
// 												) : (
// 													<TableCell align='right'>
// 														<Button variant='outlined' fullWidth>
// 															UnAssign
// 														</Button>
// 													</TableCell>
// 												)}
// 												<TableCell align='right'>
// 													{task.userId === null ? (
// 														<Button
// 															onClick={() => dispatch(deleteTask(task.id))}>
// 															<DeleteIcon color='warning' />
// 														</Button>
// 													) : (
// 														<Button disabled>
// 															<DeleteIcon />
// 														</Button>
// 													)}
// 												</TableCell>
// 											</TableRow>
// 										);
// 									})}
// 								</TableBody>
// 							</Table>
// 						</Box>
// 					</Collapse>
// 				</TableCell>
// 			</TableRow>
// 		</React.Fragment>
// 	);
// }
