import React, { useState } from "react";
import ".././styles/UserSettings.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/actions/auth.actions";

const UserSettings = () => {
	const dispatch = useDispatch();
	const { userDetails } = useSelector((state) => state.auth);
	const [values, setValues] = useState({
		name: userDetails.name,
		newEmail: userDetails.email,
		password: "",
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
		dispatch(updateUser({ ...values, email: userDetails.email }));
	};

	return (
		<div className='settings'>
			<div className='settings-image' />
			<div className='settings-main'>
				<h3>Change Details</h3>
				<Box component='form' onSubmit={handleSubmit}>
					<TextField
						id='outlined-basic'
						label='Name'
						variant='outlined'
						fullWidth
						margin='normal'
						// required
						name='name'
						value={values.name}
						onChange={handleChange}
					/>
					<TextField
						id='outlined-basic'
						label='Email'
						variant='outlined'
						fullWidth
						margin='normal'
						// required
						name='email'
						type='email'
						value={values.newEmail}
						onChange={handleChange}
					/>
					<TextField
						id='outlined-basic'
						label='New Password'
						variant='outlined'
						fullWidth
						margin='normal'
						// required
						type='password'
						name='password'
						value={values.password}
						// value='Dancan2021@'
						onChange={handleChange}
					/>

					<Button variant='outlined' type='submit'>
						Save
					</Button>
				</Box>
			</div>
		</div>
	);
};

export default UserSettings;
