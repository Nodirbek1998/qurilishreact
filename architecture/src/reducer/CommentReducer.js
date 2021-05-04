import { GET_COMMENT_PRORECTOR } from "../actions/Types";

const initialState = {
    proRector : []
};

export default function foo(state = initialState, action) {
    switch (action.type) {
        case GET_COMMENT_PRORECTOR:
            return {
                ...state,
                proRector: action.payload,
            };
        default:
            return state;
    }
}
