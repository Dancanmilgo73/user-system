import { usersRequest } from "../../Api";
import {
	DELETE_USER_FAIL,
	DELETE_USER_REQUEST,
	DELETE_USER_SUCCESS,
	GET_USERS_FAIL,
	GET_USERS_REQUEST,
	GET_USERS_SUCCESS,
} from "../actionTypes";

export const getAllUsers = () => async (dispatch) => {
	try {
		dispatch({ type: GET_USERS_REQUEST });
		const { data } = await usersRequest.get("/user", {
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("stored-token")}`,
			},
		});
		// console.log(data.recordset);
		dispatch({ type: GET_USERS_SUCCESS, payload: data.recordset });
	} catch (error) {
		console.log(error.response.message);
		dispatch({ type: GET_USERS_FAIL, payload: error.response.data.message });
	}
};
export const deleteUser = (input) => async (dispatch) => {
	console.log(input);
	try {
		dispatch({ type: DELETE_USER_REQUEST });
		const { data } = await usersRequest.delete(`/user/delete/${input.email}`, {
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("stored-token")}`,
			},
		});
		console.log("hello");
		dispatch({ type: DELETE_USER_SUCCESS, payload: data });
		dispatch(getAllUsers());
	} catch (error) {
		console.log(error.response.data.message);
		dispatch({ type: DELETE_USER_FAIL, payload: error.response.data.message });
	}
};
