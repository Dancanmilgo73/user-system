import axios from "axios";

export const usersRequest = axios.create({
	baseURL: "http://localhost:3001",
});
export const projectsRequest = axios.create({
	baseURL: "http://localhost:3002",
});
