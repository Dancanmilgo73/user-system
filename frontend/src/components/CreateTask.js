import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { addProject } from "../redux/actions/projects.actions";
// import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../redux/actions/tasks.action";

export default function CreateTask({ projectId }) {
	const dispatch = useDispatch();
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const taskDetails = {
			name: data.get("taskName"),
			description: data.get("taskDescription"),
			projectId: projectId,
		};
		// console.log(projectDetails);
		// dispatch(addProject(projectDetails));
		dispatch(addTask(taskDetails));
		setOpen(false);
	};
	return (
		<div>
			<Button variant='outlined' sx={{ mt: 2 }} onClick={handleClickOpen}>
				CREATE TASK
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Fill the project Details below</DialogTitle>
				<Box component='form' onSubmit={handleSubmit} noValidate>
					<DialogContent>
						<DialogContentText>
							It is not mandatory to provide a task description but it is nice
							to have.
						</DialogContentText>

						<TextField
							id='outlined-basic'
							label='Task Name'
							variant='outlined'
							fullWidth
							margin='normal'
							required
							name='taskName'
						/>

						<TextField
							id='outlined-basic'
							label='Task Description'
							variant='outlined'
							fullWidth
							margin='normal'
							name='taskDescription'
						/>

						{/* <TextField
						autoFocus
						margin='dense'
						id='name'
						label='Email Address'
						type='email'
						fullWidth
						variant='standard'
					/> */}
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button type='submit'>Submit</Button>
					</DialogActions>
				</Box>
			</Dialog>
		</div>
	);
}
