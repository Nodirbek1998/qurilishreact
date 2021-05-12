import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducers from "./reducer";

const initialState = {};
const middleware = [thunk];
let store

store = createStore(
        rootReducers,
        initialState,
        compose(applyMiddleware(...middleware))
    );



export default store;

