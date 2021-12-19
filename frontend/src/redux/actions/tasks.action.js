import { projectsTasksRequest } from "../../Api";
import {
	ADD_PROJECT_SUCCESS,
	ADD_TASK_FAIL,
	ADD_TASK_REQUEST,
	ASSIGN_TASK_FAIL,
	ASSIGN_TASK_REQUEST,
	ASSIGN_TASK_SUCCESS,
	GET_TASKS_FAIL,
	GET_TASKS_REQUEST,
	GET_TASKS_SUCCESS,
} from "../actionTypes";

export const getTasks = () => async (dispatch) => {
	try {
		dispatch({ type: GET_TASKS_REQUEST });
		const { data } = await projectsTasksRequest.get("/tasks", {
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("stored-token")}`,
			},
		});
		dispatch({ type: GET_TASKS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: GET_TASKS_FAIL, payload: error.message });
	}
};

export const assignTask = (input) => async (dispatch) => {
	try {
		dispatch({ type: ASSIGN_TASK_REQUEST });
		const { data } = await projectsTasksRequest.post(
			`/tasks/assign/${input.taskId}`,
			{ userId: input.userId },
			{
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("stored-token")}`,
				},
			}
		);
		console.log(data);
		dispatch({ type: ASSIGN_TASK_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ASSIGN_TASK_FAIL, payload: error.response.data.message });
	}
};

export const addTask = (input) => async (dispatch) => {
	try {
		dispatch({ type: ADD_TASK_REQUEST });
		const { data } = await projectsTasksRequest.post("/tasks", input, {
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("stored-token")}`,
			},
		});
		dispatch({ type: ADD_PROJECT_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ADD_TASK_FAIL, payload: error.response.data.message });
	}
};
