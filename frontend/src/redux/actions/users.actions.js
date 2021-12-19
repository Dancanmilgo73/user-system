import { usersRequest } from "../../Api";
import {
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
