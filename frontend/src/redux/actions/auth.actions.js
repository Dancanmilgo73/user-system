import { usersRequest } from "../../Api";
import {
	LOGIN_FAIL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	SIGNUP_FAIL,
	SIGNUP_REQUEST,
	SIGNUP_SUCCESS,
	UPDATE_PROJECT_FAIL,
	UPDATE_PROJECT_SUCCESS,
	UPDATE_USER_FAIL,
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
} from "../actionTypes";

export const loginUser = (user) => async (dispatch) => {
	// console.log(user);
	try {
		dispatch({ type: LOGIN_REQUEST });
		const { data } = await usersRequest.post("/user/login", user);
		console.log(data);
		sessionStorage.setItem("stored-token", data.accessToken);
		sessionStorage.setItem("stored-user", JSON.stringify(data.user));
		dispatch({
			type: LOGIN_SUCCESS,
			payload: { accessToken: data.accessToken, userDetails: data.user },
		});
	} catch (error) {
		dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
	}
};
export const registerUser = (user) => async (dispatch) => {
	try {
		dispatch({ type: SIGNUP_REQUEST });
		const { data } = await usersRequest.post("/user/register", user);
		console.log(data);
		sessionStorage.setItem("stored-token", data.accessToken);
		sessionStorage.setItem("stored-user", JSON.stringify(data.user));

		dispatch({
			type: SIGNUP_SUCCESS,
			payload: { accessToken: data.accessToken, userDetails: data.user },
		});
	} catch (error) {
		// console.log(error.response.data.message);
		dispatch({ type: SIGNUP_FAIL, payload: error.response.data.message });
	}
};
export const updateUser = (input) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_USER_REQUEST });

		const { data } = await usersRequest.post(
			`/user/update/`,
			{
				newEmail: input.newEmail,
				newPassword: input.password,
				newUserName: input.name,
				email: input.email,
			},

			{
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("stored-token")}`,
				},
			}
		);
		sessionStorage.clear();
		sessionStorage.setItem("stored-token", data.accessToken);
		sessionStorage.setItem("stored-user", JSON.stringify(data.user));

		dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: UPDATE_USER_FAIL,
			payload: error.response.data.message,
		});
	}
};
