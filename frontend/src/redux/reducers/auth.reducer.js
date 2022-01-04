import {
	LOGIN_FAIL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	SIGNUP_FAIL,
	SIGNUP_REQUEST,
	SIGNUP_SUCCESS,
	UPDATE_USER_SUCCESS,
} from "../actionTypes";

const initialState = {
	token: sessionStorage.getItem("stored-token")
		? sessionStorage.getItem("stored-token")
		: null,
	loading: false,
	error: null,
	userDetails: sessionStorage.getItem("stored-user")
		? JSON.parse(sessionStorage.getItem("stored-user"))
		: null,
};

export const authReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case LOGIN_REQUEST:
			return {
				...state,
				loading: true,
			};
		case SIGNUP_REQUEST:
			return {
				...state,
				loading: true,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				token: payload.accessToken,
				userDetails: payload.userDetails,
			};
		case UPDATE_USER_SUCCESS:
			return {
				...state,
				token: payload.accessToken,
				userDetails: payload.user,
			};
		case SIGNUP_SUCCESS:
			return {
				...state,
				loading: false,
				token: payload.accessToken,
				userDetails: payload.userDetails,
			};
		case LOGIN_FAIL:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case SIGNUP_FAIL:
			return {
				...state,
				laoding: false,
				error: payload,
			};
		default:
			return state;
	}
};
