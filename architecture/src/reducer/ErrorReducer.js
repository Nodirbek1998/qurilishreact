import { GET_ERRORS } from "../actions/Types";

const initialState = {};

export default function foo(state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return {
                ...state,
                errors: action.payload,
            };
        default:
            return state;
    }
}
