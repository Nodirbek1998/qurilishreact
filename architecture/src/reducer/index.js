import { combineReducers } from "redux";
import AuthReducer from './AuthReducer';
import ErrorReducer from "./ErrorReducer";
import UsersReducer from './UsersReducer';
import MessageReducer from './MessageReducer';
import ProjectReducer from './ProjectReducer';
import ProgressReducer from './ProgressReducer';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import CommentReducer from './CommentReducer';

const persistConfig = {
    key : 'root',
    storage,
    whitelist : ['auth']
}

const rootReducer = combineReducers({ 
    auth: AuthReducer,
    errors : ErrorReducer,
    UsersReducer,
    MessageReducer,
    ProjectReducer,
    ProgressReducer,
    CommentReducer
});

export default persistReducer(persistConfig, rootReducer);