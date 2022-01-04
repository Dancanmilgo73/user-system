import { projectsTasksRequest } from "../../Api";
import {
	ADD_PROJECT_FAIL,
	ADD_PROJECT_REQUEST,
	ADD_PROJECT_SUCCESS,
	DELETE_PROJECT_FAIL,
	DELETE_PROJECT_SUCCESS,
	DELETE_TASK_REQUEST,
	GET_PROJECTS_FAIL,
	GET_PROJECTS_REQUEST,
	GET_PROJECTS_SUCCESS,
	GET_PROJECT_FAIL,
	GET_PROJECT_REQUEST,
	GET_PROJECT_SUCCESS,
	SUBMIT_PROJECT_FAIL,
	SUBMIT_PROJECT_REQUEST,
	SUBMIT_PROJECT_SUCCESS,
	UPDATE_PROJECT_FAIL,
	UPDATE_PROJECT_REQUEST,
	UPDATE_PROJECT_SUCCESS,
} from "../actionTypes";

export const getProjects = () => async (dispatch) => {
	try {
		dispatch({ type: GET_PROJECTS_REQUEST });
		const { data } = await projectsTasksRequest.get("/projects/all", {
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("stored-token")}`,
			},
		});
		dispatch({ type: GET_PROJECTS_SUCCESS, payload: data });
	} catch (error) {
		// console.log(error.response.data.message);
		dispatch({
			type: GET_PROJECTS_FAIL,
			payload: error.response?.data.message,
		});
	}
};

export const addProject = (project) => async (dispatch) => {
	// console.log(project);
	try {
		dispatch({ type: ADD_PROJECT_REQUEST });
		const { data } = await projectsTasksRequest.post("/projects/add", project, {
			headers: {
				ContentType: "application/json",
				Authorization: `Bearer ${sessionStorage.getItem("stored-token")}`,
			},
		});
		console.log(data);
		dispatch({ type: ADD_PROJECT_SUCCESS, payload: data });
	} catch (error) {
		// console.log(error.response.data.message);
		// console.log(error.message);
		dispatch({ type: ADD_PROJECT_FAIL, payload: error.response.data.message });
	}
};
export const updateProject = (input) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_PROJECT_REQUEST });
		const { data } = await projectsTasksRequest.patch(
			`/projects/${input.id}`,
			{ name: input.name, description: input.description },
			{
				headers: {
					ContentType: "application/json",
					Authorization: `Bearer ${sessionStorage.getItem("stored-token")}`,
				},
			}
		);

		dispatch({ type: UPDATE_PROJECT_SUCCESS, payload: data });
		dispatch(getProjects());
	} catch (error) {
		// console.log(error.response.data.message);
		dispatch({
			type: UPDATE_PROJECT_FAIL,
			payload: error.response.data.message,
		});
	}
};
export const getProjectById = (id) => async (dispatch) => {
	try {
		dispatch({ type: GET_PROJECT_REQUEST });
		const { data } = await projectsTasksRequest.get(`/projects/${id}`, {
			headers: {
				ContentType: "application/json",
				Authorization: `Bearer ${sessionStorage.getItem("stored-token")}`,
			},
		});
		dispatch({ type: GET_PROJECT_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: GET_PROJECT_FAIL, payload: error.response.data.message });
	}
};
export const deleteProject = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_TASK_REQUEST });
		const { data } = await projectsTasksRequest.delete(`/projects/${id}`, {
			headers: {
				ContentType: "application/json",
				Authorization: `Bearer ${sessionStorage.getItem("stored-token")}`,
			},
		});
		dispatch({ type: DELETE_PROJECT_SUCCESS, payload: data });
		dispatch(getProjects());
	} catch (error) {
		dispatch({
			type: DELETE_PROJECT_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const markCompleteProject = (input) => async (dispatch) => {
	try {
		console.log(input);
		dispatch({ type: SUBMIT_PROJECT_REQUEST });
		const { data } = await projectsTasksRequest.put(
			`/projects/complete/${input.id}`,
			{ status: input.status },
			{
				headers: {
					ContentType: "application/json",
					Authorization: `Bearer ${sessionStorage.getItem("stored-token")}`,
				},
			}
		);
		dispatch({ type: SUBMIT_PROJECT_SUCCESS, payload: data });
		dispatch(getProjects());
	} catch (error) {
		console.log(error.response.data.message);
		dispatch({
			type: SUBMIT_PROJECT_FAIL,
			payload: error.response.data.message,
		});
	}
};
