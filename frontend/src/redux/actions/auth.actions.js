import { usersRequest } from "../../Api";
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "../actionTypes";

export const loginUser = (user) => async (dispatch) => {
	// console.log(user);
	try {
		dispatch({ type: LOGIN_REQUEST });
		const { data } = await usersRequest.post("/user/login", user);
		sessionStorage.setItem("stored-token", data.accessToken);
		dispatch({ type: LOGIN_SUCCESS, payload: data.accessToken });
	} catch (error) {
		dispatch({ type: LOGIN_FAIL, payload: error.message });
	}
};
