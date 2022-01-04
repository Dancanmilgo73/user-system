import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/actions/auth.actions";
import Spinner from "./Spinner";
import Autocomplete from "@mui/material/Autocomplete";
import { countries } from "../helpers/countries";
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

export default function SignUp() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error, token } = useSelector((state) => state.auth);
	if (token !== null) navigate("/dashboard");

	console.log(error);
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		// eslint-disable-next-line no-console
		const registerDetails = {
			email: data.get("email"),
			username: data.get("userName"),
			password: data.get("password"),
			confirmPassword: data.get("confirmPassword"),
			phoneNumber: `${data.get("code")}${data.get("phoneNumber")}`,
		};
		console.log(registerDetails);
		dispatch(registerUser(registerDetails));
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
						Sign up
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
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									autoComplete='given-name'
									name='userName'
									required
									fullWidth
									id='userName'
									label='User Name'
									autoFocus
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id='email'
									label='Email Address'
									name='email'
									autoComplete='email'
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name='password'
									label='Password'
									type='password'
									id='password'
									autoComplete='new-password'
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name='confirmPassword'
									label='Confirm Password'
									type='password'
									id='confirmPassword'
									autoComplete='new-password'
								/>
							</Grid>
							<Grid item xs={4}>
								<Autocomplete
									id='country-select-demo'
									options={countries}
									autoHighlight
									getOptionLabel={(option) => option.phone}
									renderOption={(props, option) => (
										<Box component='li' {...props}>
											{option.code} +{option.phone}
										</Box>
									)}
									renderInput={(params) => (
										<TextField
											{...params}
											label='CODE'
											name='code'
											id='code'
											inputProps={{
												...params.inputProps,
												// autoComplete: "new-password", // disable autocomplete and autofill
											}}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={8}>
								<TextField
									required
									fullWidth
									name='phoneNumber'
									label='phoneNumber'
									type='tel'
									id='phoneNumber'
									// autoComplete='phoneNumber'
								/>
							</Grid>
						</Grid>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}>
							Sign Up
						</Button>
						<Grid container justifyContent='flex-end'>
							<Grid item>
								<RouterLink to='/'>
									<Link variant='body2'>Already have an account? Sign in</Link>
								</RouterLink>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	);
}
