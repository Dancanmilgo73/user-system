import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "../actionTypes";

const initialState = {
	token: sessionStorage.getItem("stored-token")
		? sessionStorage.getItem("stored-token")
		: null,
	loading: false,
	response: null,
};

export const authReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case LOGIN_REQUEST:
			return {
				...state,
				loading: true,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				token: payload,
			};
		case LOGIN_FAIL:
			return {
				...state,
				loading: false,
				response: payload,
			};
		default:
			return state;
	}
};
