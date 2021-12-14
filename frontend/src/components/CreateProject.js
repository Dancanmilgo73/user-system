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
export default function CreateProject() {
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
		// eslint-disable-next-line no-console
		const projectDetails = {
			name: data.get("projectName"),
			description: data.get("projectDescription"),
		};
		// console.log(projectDetails);
		dispatch(addProject(projectDetails));
		setOpen(false);
	};
	return (
		<div>
			<Button variant='contained' sx={ {mb: 2}} onClick={handleClickOpen}>
				ADD PROJECT
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Fill the project Details below</DialogTitle>
				<Box component='form' onSubmit={handleSubmit} noValidate>
					<DialogContent>
						<DialogContentText>
							It is not mandatory to provide a project description but it is
							nice to have.
						</DialogContentText>

						<TextField
							id='outlined-basic'
							label='Project Name'
							variant='outlined'
							fullWidth
							margin='normal'
							required
							name='projectName'
						/>

						<TextField
							id='outlined-basic'
							label='Project Description'
							variant='outlined'
							fullWidth
							margin='normal'
							name='projectDescription'
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
