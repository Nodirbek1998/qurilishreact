import {  GET_PROGRESS} from "../actions/Types";

const initialState = {
    projectProgress: {},
};
    export default function foo(state = initialState, action) {
    switch (action.type) {
        case GET_PROGRESS:
        return {
            ...state,
            projectProgress : action.payload
        };
        default:
        return state;
    }
}