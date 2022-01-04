import { combineReducers } from "redux";
import { authReducer, registerReducer } from "./auth.reducer";
import { projectsReducer } from "./projects.reducer";
import { submitProjectReducer } from "./submits.reducer";
import { tasksReducer } from "./tasks.reducer";
import { usersReducer } from "./users.reducer";

const rootReducer = combineReducers({
	auth: authReducer,
	projects: projectsReducer,
	tasks: tasksReducer,
	users: usersReducer,
	submitProject: submitProjectReducer,
});

export default rootReducer;
