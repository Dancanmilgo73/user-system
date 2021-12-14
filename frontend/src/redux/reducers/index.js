import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { projectsReducer } from "./projects.reducer";
import { tasksReducer } from "./tasks.reducer";

const rootReducer = combineReducers({ auth: authReducer, projects: projectsReducer, tasks: tasksReducer});

export default rootReducer;
