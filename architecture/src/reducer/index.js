import { combineReducers } from "redux";
import AuthReducer from './AuthReducer';
import ErrorReducer from "./ErrorReducer";
import UsersReducer from './UsersReducer';
import MessageReducer from './MessageReducer';
import ProjectReducer from './ProjectReducer';
import ProgressReducer from './ProgressReducer';

export default combineReducers({ 
    auth: AuthReducer,
    errors : ErrorReducer,
    UsersReducer,
    MessageReducer,
    ProjectReducer,
    ProgressReducer
})