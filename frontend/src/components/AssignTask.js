import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/actions/users.actions";
import { assignTask } from "../redux/actions/tasks.action";

export default function AssignTask({ task }) {
	// console.log(task);
	const [open, setOpen] = React.useState(false);
	const [userId, setUserId] = React.useState("");
	const dispatch = useDispatch();
	const { users, loading } = useSelector((state) => state.users);
	const availableDevs = users.filter(
		(user) => user.projectId === null || user.projectId === task.projectId
	);
	// console.log(availableDevs);
	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch]);
	const handleChange = (event) => {
		setUserId(Number(event.target.value) || "");
		// console.log(userId);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason !== "backdropClick") {
			setOpen(false);
		}
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log({ taskId: task.id, userId: userId });
		dispatch(assignTask({ taskId: task.id, userId: userId }));
		dispatch(getAllUsers());
		setOpen(false);
	};
	return (
		<div>
			<Button onClick={handleClickOpen} variant='outlined' fullWidth>
				Assign Task
			</Button>
			<Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
				<DialogTitle>Select from the list of available developers</DialogTitle>
				<DialogContent>
					<Box
						component='form'
						sx={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}
						onSubmit={handleSubmit}>
						<FormControl sx={{ mt: 1 }} fullWidth>
							<InputLabel id='demo-dialog-select-label'>Developer</InputLabel>
							<Select
								labelId='demo-dialog-select-label'
								id='demo-dialog-select'
								value={userId}
								onChange={handleChange}
								input={<OutlinedInput label='Developer' />}>
								<MenuItem value=''>
									<em>None</em>
								</MenuItem>
								{availableDevs.map((dev) => (
									<MenuItem value={dev.userId}>{dev.username}</MenuItem>
								))}
							</Select>
						</FormControl>
						<DialogActions>
							<Button onClick={handleClose}>Cancel</Button>
							<Button type='submit' align='right'>
								Ok
							</Button>
						</DialogActions>
					</Box>
				</DialogContent>
			</Dialog>
		</div>
	);
}
