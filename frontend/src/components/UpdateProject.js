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
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import {
	getProjectById,
	getProjects,
	updateProject,
} from "../redux/actions/projects.actions";
import Box from "@mui/material/Box";

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

export default function UpdateProject({ projectId }) {
	// const initialFormVals = { name: project.name, description: "" };
	// console.log(projectId);
	const dispatch = useDispatch();

	const { singleProject } = useSelector((state) => state.projects);
	console.log(singleProject);

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		// console.log("id:", projectId);
		dispatch(getProjectById(projectId));

		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const [values, setValues] = useState({
		projectName: "",
		projectDescription: "",
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
		if (values.projectName.length || values.projectDescription.length) {
			dispatch(
				updateProject({
					name: values.projectName,
					description: values.projectDescription,
					id: projectId,
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
					{singleProject[0].name} Details
				</BootstrapDialogTitle>
				<Box component='form' onSubmit={handleSubmit}>
					<DialogContent dividers>
						<TextField
							id='outlined-basic'
							label='Project Name'
							variant='outlined'
							fullWidth
							margin='normal'
							required
							name='projectName'
							value={values.projectName}
							onChange={handleChange}
						/>
						<TextField
							id='outlined-basic'
							label='Project Description'
							variant='outlined'
							fullWidth
							margin='normal'
							required
							name='projectDescription'
							value={values.projectDescription}
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
