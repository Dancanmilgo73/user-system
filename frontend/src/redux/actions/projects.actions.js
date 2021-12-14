import { projectsTasksRequest } from "../../Api";
import {
	ADD_PROJECT_FAIL,
	ADD_PROJECT_REQUEST,
	ADD_PROJECT_SUCCESS,
	GET_PROJECTS_FAIL,
	GET_PROJECTS_REQUEST,
	GET_PROJECTS_SUCCESS,
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
		console.log(error.response.data.message);
		dispatch({ type: GET_PROJECTS_FAIL, payload: error.response.data.message });
	}
};

export const addProject = (project) => async (dispatch) => {
	// console.log(project);
	try {
		dispatch({ type: ADD_PROJECT_REQUEST });
		const { data } = await projectsTasksRequest.post("/projects/add", project,{
			headers: {
				ContentType: "application/json",
				Authorization: `Bearer ${sessionStorage.getItem("stored-token")}`,
			},

		});
		console.log(data);
		dispatch({ type: ADD_PROJECT_SUCCESS, payload: data });
	} catch (error) {
		console.log(error.response.data.message);
		console.log(error.message);
		dispatch({ type: ADD_PROJECT_FAIL, payload: error.response.data.message });
	}
};
