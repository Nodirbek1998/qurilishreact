import { GET_TOKEN } from "../actions/Types";

const initialState = {
    token: {},
    validToken: false,
    };
    export default function foo(state = initialState, action) {
    switch (action.type) {
        case GET_TOKEN:
        return {
            ...state,
            token: action.payload,
            validToken: action.payload ? true : false,
        };
        default:
        return state;
    }
}
