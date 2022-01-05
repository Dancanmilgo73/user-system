import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import { updateTask } from "../redux/actions/tasks.action";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}));

const BootstrapDialogTitle = (props) => {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label='close'
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
};

BootstrapDialogTitle.propTypes = {
	children: PropTypes.node,
	onClose: PropTypes.func.isRequired,
};

export default function UpdateTask({ task }) {
	// const initialFormVals = { name: project.name, description: "" };
	// console.log(projectId);
	const dispatch = useDispatch();

	const { singleProject } = useSelector((state) => state.projects);
	console.log(singleProject);

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		// console.log("id:", projectId);
		// dispatch(getProjectById(projectId));

		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const [values, setValues] = useState({
		taskName: task.name,
		taskDescription: task.description,
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (values.taskName.length || values.taskDescription.length) {
			dispatch(
				updateTask({
					name: values.taskName,
					description: values.taskDescription,
					id: task.id,
				})
			);
		}
	};
	// useEffect(() => {
	// 	dispatch(getProjectById(projectId));
	// 	console.log("another one");
	// }, [dispatch, projectId]);
	return (
		<div>
			<Button variant='outlined' onClick={handleClickOpen}>
				UPDATE
			</Button>
			<BootstrapDialog
				onClose={handleClose}
				aria-labelledby='customized-dialog-title'
				open={open}>
				<BootstrapDialogTitle
					id='customized-dialog-title'
					onClose={handleClose}>
					{task.name} Details
				</BootstrapDialogTitle>
				<Box component='form' onSubmit={handleSubmit} noValidate>
					<DialogContent dividers>
						<TextField
							id='outlined-basic'
							label='Task Name'
							variant='outlined'
							fullWidth
							margin='normal'
							required
							name='taskName'
							value={values.taskName}
							onChange={handleChange}
						/>
						<TextField
							id='outlined-basic'
							label='Task Description'
							variant='outlined'
							fullWidth
							margin='normal'
							required
							name='taskDescription'
							value={values.taskDescription}
							onChange={handleChange}
						/>
					</DialogContent>
					<DialogActions>
						<Button autoFocus onClick={handleClose} type='submit'>
							Save
						</Button>
					</DialogActions>
				</Box>
			</BootstrapDialog>
		</div>
	);
}
