import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/auth.actions";
import { Link as RouterLink, Navigate } from "react-router-dom";
import Spinner from "./Spinner";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
function Copyright(props) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}>
			{"Copyright © "}
			<Link color='inherit' href='https://mui.com/'>
				The Jitu
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const theme = createTheme();

export default function SignIn() {
	const dispatch = useDispatch();
	const { token, loading, error } = useSelector((state) => state.auth);
	console.log(token);
	if (token !== null) return <Navigate to='/dashboard' />;
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		// eslint-disable-next-line no-console
		const userDetails = {
			email: data.get("email"),
			password: data.get("password"),
		};
		dispatch(loginUser(userDetails));
		console.log({
			email: data.get("email"),
			password: data.get("password"),
		});
	};
	return loading ? (
		<Spinner />
	) : (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign in
					</Typography>
					{error && (
						<Stack sx={{ width: "100%" }} spacing={2}>
							<Alert severity='error'>
								<AlertTitle>Error</AlertTitle>
								<strong>{error}</strong>
							</Alert>
						</Stack>
					)}
					<Box
						component='form'
						onSubmit={handleSubmit}
						// noValidate
						sx={{ mt: 1 }}>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							autoFocus
							type='email'
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
						/>

						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href='#' variant='body2'>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<RouterLink to='/register'>
									<Link variant='body2'>
										{"Don't have an account? Sign Up"}
									</Link>
								</RouterLink>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}
