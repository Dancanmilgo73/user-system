import { usersRequest } from "../../Api";
import {
	DELETE_USER_FAIL,
	DELETE_USER_REQUEST,
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
	try {
		dispatch({ type: DELETE_USER_REQUEST });
		const { data } = await usersRequest.delete("/user/delete", input, {
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("stored-token")}`,
			},
		});
		console.log("hello");
		dispatch(getAllUsers());
	} catch (error) {
		dispatch({ type: DELETE_USER_FAIL, payload: error.response.data.message });
	}
};
