import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
	deleteProject,
	getProjects,
	markCompleteProject,
} from "../redux/actions/projects.actions";
import Button from "@mui/material/Button";

import CreateProject from "./CreateProject";

import DeleteIcon from "@mui/icons-material/Delete";
// import TaskList from "./TasksList";
import TasksTable from "./Tasks";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import UpdateProject from "./UpdateProject";

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

// TablePaginationActions.propTypes = {
// 	count: PropTypes.number.isRequired,
// 	onPageChange: PropTypes.func.isRequired,
// 	page: PropTypes.number.isRequired,
// 	rowsPerPage: PropTypes.number.isRequired,
// };
export default function ProjectsTable() {
	const dispatch = useDispatch();

	const [showProjects, setShowProjects] = useState(true);
	const [currentProject, setCurrentProject] = useState("");
	const { projects: data } = useSelector((state) => state.projects);
	const { error, message, loading } = useSelector(
		(state) => state.submitProject
	);
	// console.log(data);
	useEffect(() => {
		dispatch(getProjects());
	}, [dispatch]);
	const handleViewTasks = (project) => {
		setCurrentProject(project);
		setShowProjects(false);
	};
	const handleSetShowProjects = () => {
		setShowProjects(true);
	};
	const projects = data.sort((a, b) => (a.id < b.id ? -1 : 1));
	// Avoid a layout jump when reaching the last page with empty projectTasks.
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - projects.length) : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	const handleMarkAsComplete = (e) => {
		if (e.target.checked) {
			dispatch(markCompleteProject({ id: e.target.value, status: "complete" }));
		}
	};
	const handleMarkAsInComplete = (id) => {
		dispatch(markCompleteProject({ id: id, status: "incomplete" }));
	};
	if (error) {
		window.location.reload();
		alert(message);
	}

	return showProjects ? (
		<>
			<CreateProject />
			<TableContainer component={Paper}>
				{/* <Button variant='contained'>Create New Project</Button> */}
				<Table>
					<TableHead>
						<TableRow>
							<TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>

							<TableCell sx={{ fontWeight: "bold" }}>ProjectName</TableCell>
							<TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>

							<TableCell align='right'></TableCell>
							<TableCell align='right' sx={{ fontWeight: "bold" }}>
								Mark As Complete
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{(rowsPerPage > 0
							? projects.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
							  )
							: projects
						).map((project) => (
							// <TaskList key={project.id} project={project} />
							<TableRow key={project.id}>
								<TableCell>{project.id}</TableCell>
								<TableCell>{project.name}</TableCell>
								<TableCell
									sx={
										project.isCompleted
											? { color: "inherit" }
											: { color: "green", fontStyle: "italic" }
									}>
									{project.isCompleted ? "Complete" : "In progress"}
								</TableCell>
								{/* <TableCell align='right'>{project.id}</TableCell> */}
								<TableCell align='right'>
									{project.isCompleted ? (
										<Button disabled>Tasks</Button>
									) : (
										<Button
											variant='outlined'
											onClick={() => handleViewTasks(project)}>
											Tasks
										</Button>
									)}
								</TableCell>
								<TableCell align='right'>
									{/* <Button variant='outlined'>Update</Button> */}
									<UpdateProject projectId={project.id} key={project.id} />
								</TableCell>
								<TableCell align='right'>
									<Button
										onClick={() => {
											dispatch(deleteProject(project.id));
											window.location.reload();
										}}>
										<DeleteIcon color='warning' />
									</Button>
								</TableCell>
								<TableCell align='right'>
									{project.isCompleted ? (
										<Checkbox
											color='success'
											onChange={() => handleMarkAsInComplete(project.id)}
											value={project.id}
											defaultChecked
										/>
									) : (
										<Checkbox
											color='success'
											onChange={handleMarkAsComplete}
											value={project.id}
										/>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					{projects.length > 5 && (
						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
									colSpan={3}
									count={projects.length}
									rowsPerPage={rowsPerPage}
									page={page}
									SelectProps={{
										inputProps: {
											"aria-label": "Tasks per page",
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
		</>
	) : (
		<div>
			<TasksTable
				project={currentProject}
				showProjects={handleSetShowProjects}
			/>
		</div>
	);
}

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
