import { GET_GIP_USERS, GET_USER, GET_USERS } from "../actions/Types";

const initialState = {
    users: [],
    user : {},
    gipUser : []
    };
    export default function foo(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
        return {
            ...state,
            users: action.payload
        };
        case GET_GIP_USERS:
        return {
            ...state,
            gipUser : action.payload
        };
        case GET_USER:
            return{
                ...state,
                user: action.payload
            }
        default:
        return state;
    }
}
