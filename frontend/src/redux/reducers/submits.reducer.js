import {
	SUBMIT_PROJECT_FAIL,
	SUBMIT_PROJECT_REQUEST,
	SUBMIT_PROJECT_SUCCESS,
} from "../actionTypes";

const initialState = {
	error: false,
	message: "",
	loading: false,
};

export const submitProjectReducer = (
	state = initialState,
	{ type, payload }
) => {
	switch (type) {
		case SUBMIT_PROJECT_REQUEST:
			return {
				...state,
				loading: true,
			};
		case SUBMIT_PROJECT_SUCCESS:
			return {
				...state,
				loading: false,
				message: payload,
			};
		case SUBMIT_PROJECT_FAIL:
			return {
				...state,
				loading: false,
				error: true,
				message: payload,
			};
		default:
			return state;
	}
};
