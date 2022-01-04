import { projectsTasksRequest } from "../../Api";
import {
	ADD_PROJECT_SUCCESS,
	ADD_TASK_FAIL,
	ADD_TASK_REQUEST,
	ASSIGN_TASK_FAIL,
	ASSIGN_TASK_REQUEST,
	ASSIGN_TASK_SUCCESS,
	DELETE_TASK_FAIL,
	DELETE_TASK_REQUEST,
	DELETE_TASK_SUCCESS,
	GET_TASKS_FAIL,
	GET_TASKS_REQUEST,
	GET_TASKS_SUCCESS,
	MARKTASK_COMPLETE_FAIL,
	MARKTASK_COMPLETE_REQUEST,
	MARKTASK_COMPLETE_SUCCESS,
	SUBMIT_TASK_FAIL,
	SUBMIT_TASK_REQUEST,
	SUBMIT_TASK_SUCCESS,
	UNASSIGN_TASK_FAIL,
	UNASSIGN_TASK_REQUEST,
	UNASSIGN_TASK_SUCCESS,
	UPDATE_PROJECT_FAIL,
	UPDATE_PROJECT_SUCCESS,
	UPDATE_TASK_REQUEST,
} from "../actionTypes";

export const getTasks = () => async (dispatch) => {
	console.log("get tasks again");
	try {
		dispatch({ type: GET_TASKS_REQUEST });
		const { data } = await projectsTasksRequest.get("/tasks", {
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("stored-token")}`,
			},
		});
		dispatch({ type: GET_TASKS_SUCCESS, payload: data });
		console.log(data);
	} catch (error) {
		dispatch({ type: GET_TASKS_FAIL, payload: error.message });
	}
};

export const assignTask = (input) => async (dispatch) => {
	try {
		dispatch({ type: ASSIGN_TASK_REQUEST });
		const { data } = await projectsTasksRequest.post(
			`/tasks/assign`,
			{ userId: input.userId, id: input.taskId, action: input.action },
			{
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("stored-token")}`,
				},
			}
		);
		// console.log(data);
		dispatch({ type: ASSIGN_TASK_SUCCESS, payload: data });
		dispatch(getTasks());
	} catch (error) {
		dispatch({ type: ASSIGN_TASK_FAIL, payload: error.response.data.message });
	}
};

export const addTask = (input) => async (dispatch) => {
	try {
		// if (input.name === "") throw new Error("Name Required");
		dispatch({ type: ADD_TASK_REQUEST });
		const { data } = await projectsTasksRequest.post("/tasks", input, {
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("stored-token")}`,
			},
		});
		dispatch({ type: ADD_PROJECT_SUCCESS, payload: data });
		dispatch(getTasks());
	} catch (error) {
		dispatch({ type: ADD_TASK_FAIL, payload: error.response.data.message });
	}
};
export const submitTask = (id) => async (dispatch) => {
	console.log(id);
	try {
		dispatch({ type: SUBMIT_TASK_REQUEST });
		const { data } = await projectsTasksRequest.get(`/tasks/submit/${id}`, {
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("stored-token")}`,
			},
		});
		// console.log(data);
		dispatch({ type: SUBMIT_TASK_SUCCESS, payload: data });
		dispatch(getTasks());
	} catch (error) {
		// console.log(error.response.data.message);
		dispatch({ type: SUBMIT_TASK_FAIL, payload: error.response.data.message });
	}
};
export const deleteTask = (id) => async (dispatch) => {
	console.log("delete task", id);
	try {
		dispatch({ type: DELETE_TASK_REQUEST });
		const { data } = await projectsTasksRequest.delete(`/tasks/${id}`, {
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("stored-token")}`,
			},
		});
		dispatch({ type: DELETE_TASK_SUCCESS, payload: data });
		console.log(data);
		dispatch(getTasks());
	} catch (error) {
		dispatch({ type: DELETE_TASK_FAIL, payload: error.response.data.message });
	}
};

export const updateTask = (input) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_TASK_REQUEST });
		const { data } = await projectsTasksRequest.put(
			`/tasks/update/${input.id}`,
			{ newName: input.name, newDescription: input.description },

			{
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("stored-token")}`,
				},
			}
		);
		dispatch({ type: UPDATE_PROJECT_SUCCESS, payload: data });
		dispatch(getTasks());
	} catch (error) {
		dispatch({
			type: UPDATE_PROJECT_FAIL,
			payload: error.response.data.message,
		});
	}
};
export const markCompleteTask = (input) => async (dispatch) => {
	try {
		dispatch({ type: MARKTASK_COMPLETE_REQUEST });
		const { data } = await projectsTasksRequest.get(
			`/tasks/complete/${input.id}`,

			{
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("stored-token")}`,
				},
			}
		);
		dispatch({ type: MARKTASK_COMPLETE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: MARKTASK_COMPLETE_FAIL,
			payload: error.response.data.message,
		});
	}
};
