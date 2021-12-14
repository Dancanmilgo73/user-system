import axios from "axios";

export const usersRequest = axios.create({
	baseURL: "http://localhost:3001",
});
export const projectsTasksRequest = axios.create({
	baseURL: "http://localhost:3002",
});
