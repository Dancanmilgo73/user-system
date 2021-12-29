import {
	GET_PROJECTS_FAIL,
	GET_PROJECTS_REQUEST,
	GET_PROJECTS_SUCCESS,
	GET_PROJECT_FAIL,
	GET_PROJECT_REQUEST,
	GET_PROJECT_SUCCESS,
} from "../actionTypes";

const initialState = {
	loading: false,
	projects: [],
	error: null,
	singleProject: [{}],
};

export const projectsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_PROJECTS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case GET_PROJECTS_SUCCESS:
			return {
				...state,
				loading: false,
				projects: [...payload],
			};
		case GET_PROJECTS_FAIL:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case GET_PROJECT_REQUEST:
			return {
				...state,
				loading: true,
			};
		case GET_PROJECT_SUCCESS:
			return {
				...state,
				loading: false,
				singleProject: payload,
			};
		case GET_PROJECT_FAIL:
			return {
				...state,
				error: payload,
				loading: false,
			};
		default:
			return state;
	}
};
