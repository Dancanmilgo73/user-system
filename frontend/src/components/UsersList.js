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
import { getProjects } from "../redux/actions/projects.actions";
import { deleteUser, getAllUsers } from "../redux/actions/users.actions";

export default function UsersList() {
	const dispatch = useDispatch();
	const { users, loading } = useSelector((state) => state.users);
	const { projects } = useSelector((state) => state.projects);

	console.log(users);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	// Avoid a layout jump when reaching the last page with empty users.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	useEffect(() => {
		dispatch(getAllUsers());
		dispatch(getProjects());
	}, []);
	const handleDeleteUser = (email) => {
		// console.log("hello dispatch");
		dispatch(deleteUser({ email: email }));
	};
	return (
		<div>
			{/* <CreateTask projectId={project.id} /> */}
			<Table sx={{ minWidth: 500 }} aria-label='custom pagination table'>
				<TableHead>
					<TableRow>
						<TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>

						<TableCell component='th' scope='row' sx={{ fontWeight: "bold" }}>
							Name
						</TableCell>
						<TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
						<TableCell sx={{ fontWeight: "bold" }}>Current Project</TableCell>

						<TableCell align='right'></TableCell>
						<TableCell align='right'></TableCell>
						<TableCell align='right' sx={{ fontWeight: "bold" }}>
							Delete
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{(rowsPerPage > 0
						? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						: users
					).map((user) => (
						<TableRow key={user.userId}>
							<TableCell>{user.userId}</TableCell>
							<TableCell component='th' scope='row'>
								{user.username}
							</TableCell>

							<TableCell>{user.email}</TableCell>
							<TableCell>
								{
									projects.find((project) => project.id === user.projectId)
										?.name
								}
							</TableCell>

							<TableCell align='right'>
								<Button variant='outlined' fullWidth>
									Update
								</Button>
							</TableCell>
							<TableCell align='right'></TableCell>
							<TableCell align='right'>
								<Button
									color='warning'
									onClick={() => handleDeleteUser(user.email)}>
									<DeleteIcon />
								</Button>
							</TableCell>
						</TableRow>
					))}

					{emptyRows > 0 && (
						<TableRow style={{ height: 53 * emptyRows }}>
							<TableCell colSpan={6} />
						</TableRow>
					)}
				</TableBody>
				{users.length > 5 && (
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
								colSpan={3}
								count={users.length}
								rowsPerPage={rowsPerPage}
								page={page}
								SelectProps={{
									inputProps: {
										"aria-label": "users per page",
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
TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};
