import { combineReducers } from "redux";
import { authReducer, registerReducer } from "./auth.reducer";
import { projectsReducer } from "./projects.reducer";
import { tasksReducer } from "./tasks.reducer";
import { usersReducer } from "./users.reducer";

const rootReducer = combineReducers({
	auth: authReducer,
	projects: projectsReducer,
	tasks: tasksReducer,
	users: usersReducer,
});

export default rootReducer;
