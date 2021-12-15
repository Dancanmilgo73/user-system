import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const names = [
	"Dancan Ngetich",
	"Joseph",
	"Caleb",
	"Joan",
	"Omar Alexander",
	"Carlos Abbott",
	"Miriam Wagner",
	"Bradley Wilkerson",
	"Virginia Andrews",
	"Kelly Snyder",
];

function getStyles(name, personName, theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

export default function AssignTask() {
	const theme = useTheme();
	const [personName, setPersonName] = React.useState([]);
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setPersonName(
			// On autofill we get a the stringified value.
			typeof value === "string" ? value.split(",") : value
		);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		// const data = new FormData(event.currentTarget);

		setOpen(false);
	};
	return (
		<div>
			<Button variant='outlined' sx={{ mt: 2 }} onClick={handleClickOpen}>
				ASSIGN
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Pick from the list of developers</DialogTitle>
				<Box component='form' onSubmit={handleSubmit} noValidate>
					<DialogContent>
						<FormControl sx={{ m: 1, width: 300 }}>
							<InputLabel id='demo-multiple-chip-label'>Chip</InputLabel>
							<Select
								labelId='demo-multiple-chip-label'
								id='demo-multiple-chip'
								multiple
								value={personName}
								onChange={handleChange}
								input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
								renderValue={(selected) => (
									<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
										{selected.map((value) => (
											<Chip key={value} label={value} />
										))}
									</Box>
								)}
								MenuProps={MenuProps}>
								{names.map((name) => (
									<MenuItem
										key={name}
										value={name}
										style={getStyles(name, personName, theme)}>
										{name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
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
