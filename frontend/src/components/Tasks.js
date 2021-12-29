import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@mui/material/TableHead";

import { useDispatch, useSelector } from "react-redux";
import {
	assignTask,
	deleteTask,
	getTasks,
} from "../redux/actions/tasks.action";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import CreateTask from "./CreateTask";
import AssignTask from "./AssignTask";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import UpdateTask from "./UpdateTask";

function TablePaginationActions(props) {
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = (event) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label='first page'>
				{theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label='previous page'>
				{theme.direction === "rtl" ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label='next page'>
				{theme.direction === "rtl" ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label='last page'>
				{theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</Box>
	);
}

TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};

export default function TasksTable({ project, showProjects }) {
	const dispatch = useDispatch();

	// const { project } = props;
	useEffect(() => {
		dispatch(getTasks());
	}, [dispatch, project]);
	const { tasks } = useSelector((state) => state.tasks);
	const projectTasks = tasks
		.filter((task) => task.projectId === project.id)
		.sort((a, b) => (a.id < b.id ? -1 : 1));
	console.log(projectTasks);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	// Avoid a layout jump when reaching the last page with empty projectTasks.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - projectTasks.length) : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<>
			<h4 style={{ fontSize: "1rem", padding: "none" }}>{project.name}</h4>
			<CreateTask projectId={project.id} />

			{projectTasks.length ? (
				<TableContainer component={Paper}>
					{/* <CreateTask projectId={project.id} /> */}
					<Table sx={{ minWidth: 500 }} aria-label='custom pagination table'>
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell component='th' scope='row'>
									Name
								</TableCell>
								<TableCell>Status</TableCell>
								<TableCell>Description</TableCell>
								<TableCell></TableCell>
								<TableCell></TableCell>
								<TableCell align='right'>Mark As Complete</TableCell>
								<TableCell align='right'>Delete</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{(rowsPerPage > 0
								? projectTasks.slice(
										page * rowsPerPage,
										page * rowsPerPage + rowsPerPage
								  )
								: projectTasks
							).map((task) => (
								<TableRow key={task.id}>
									<TableCell>{task.id}</TableCell>
									<TableCell component='th' scope='row'>
										{task.name}
									</TableCell>

									<TableCell>
										{task.userId ? "Assigned" : "UnAssigned"}
									</TableCell>
									<TableCell>{task.description}</TableCell>
									{task.userId === null ? (
										<TableCell align='right'>
											{/* <Button variant='outlined'>Assign</Button> */}
											<AssignTask task={task} />
										</TableCell>
									) : (
										<TableCell align='right'>
											<Button variant='outlined' fullWidth>
												UnAssign
											</Button>
										</TableCell>
									)}
									<TableCell align='right'>
										{/* <Button variant='outlined' fullWidth>
											Update
										</Button> */}
										<UpdateTask />
									</TableCell>
									<TableCell align='right'>
										<Checkbox
											color='success'
											// onChange={handleChange}
											value={project.id}
										/>
									</TableCell>
									<TableCell align='right'>
										{task.userId === null ? (
											<Button onClick={() => dispatch(deleteTask(task.id))}>
												<DeleteIcon color='warning' />
											</Button>
										) : (
											<Button disabled>
												<DeleteIcon />
											</Button>
										)}
									</TableCell>
								</TableRow>
							))}

							{emptyRows > 0 && (
								<TableRow style={{ height: 53 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
						{projectTasks.length > 5 && (
							<TableFooter>
								<TableRow>
									<TablePagination
										rowsPerPageOptions={[
											5,
											10,
											25,
											{ label: "All", value: -1 },
										]}
										colSpan={3}
										count={projectTasks.length}
										rowsPerPage={rowsPerPage}
										page={page}
										SelectProps={{
											inputProps: {
												"aria-label": "projectTasks per page",
											},
											native: true,
										}}
										onPageChange={handleChangePage}
										onRowsPerPageChange={handleChangeRowsPerPage}
										ActionsComponent={TablePaginationActions}
									/>
								</TableRow>
							</TableFooter>
						)}
					</Table>
				</TableContainer>
			) : (
				<Typography
					component='h1'
					variant='h6'
					color='inherit'
					noWrap
					fullWidth
					align='center'
					sx={{ flexGrow: 1 }}>
					No Tasks currently created
				</Typography>
			)}
			<Button
				variant='contained'
				sx={{
					display: "flex",
					justifyContent: "flexStart",
					margin: " 1rem 1rem",
				}}
				onClick={() => showProjects()}>
				Back
			</Button>
		</>
	);
}
