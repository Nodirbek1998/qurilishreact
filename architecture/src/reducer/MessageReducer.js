import { GET_MESSAGE } from "../actions/Types";

const initialState = {};

export default function foo(state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGE:
            return {
                ...state,
                message: action.payload,
            };
        default:
            return state;
    }
}
