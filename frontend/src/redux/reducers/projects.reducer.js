import { GET_PROJECTS_FAIL, GET_PROJECTS_REQUEST, GET_PROJECTS_SUCCESS } from "../actionTypes";

const initialState = {
    loasing: false,
    projects: [],
    error: null
}

export const projectsReducer = (state = initialState, { type, payload }) =>
{
    switch (type)
    {
        case GET_PROJECTS_REQUEST:
            return {
                ...state, loading: true
            };
        case GET_PROJECTS_SUCCESS:
            return {
                ...state, loading: false, projects: [...payload]
            };
        case GET_PROJECTS_FAIL:
            return {
                ...state, loading: false, error: payload
            };
        default:
            return state;
    }
}