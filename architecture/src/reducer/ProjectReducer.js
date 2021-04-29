import { GET_PROJECTS, GET_PROJECT, GET_PROJECT_ACTIVE, GET_PROJECT_FINISHED, GET_PROJECT_INPROGRESS} from "../actions/Types";

const initialState = {
    projects: [],
    project : {},
    project_inProgress : [],
    project_finished : [],
    project_active : []
    };
    export default function foo(state = initialState, action) {
    switch (action.type) {
        case GET_PROJECTS:
        return {
            ...state,
            projects: action.payload
        };
        case GET_PROJECT_ACTIVE:
        return {
            ...state,
            project_active : action.payload
        };
        case GET_PROJECT_FINISHED:
        return {
            ...state,
            project_finished : action.payload
        };
        case GET_PROJECT_INPROGRESS:
        return {
            ...state,
            project_inProgress : action.payload
        };
        case GET_PROJECT:
        return {
            ...state,
            project: action.payload
        };
        default:
        return state;
    }
}