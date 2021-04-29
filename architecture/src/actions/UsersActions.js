
import { GET_ERRORS, GET_USER, GET_USERS, GET_MESSAGE } from "../actions/Types";
import client from 'services/api';
export const getUsers = () => async dispatch =>{
    try{
        const users = await client.get("/uz/cas/user"); 
        dispatch({
            type : GET_USERS,
            payload : users.data.body
        })
    } catch(error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data,
        });
    }
}
export const getUsermap = () => async dispatch =>{
    try{ 
        const users = await client.get("/uz/cas/user/map"); 
        dispatch({
            type : GET_USERS,
            payload : users.data.body
        })
    } catch(error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data,
        });
    }
}
export const addUser = (user, history) => async dispatch =>{ 
    try{
        const res = await client.post("/uz/cas/user", user);
        dispatch({
            type: GET_MESSAGE,
            payload: res.data.body,
        });
        history.push("/admin");
    }catch(error){
        dispatch({
            type: GET_ERRORS,
            payload: error.data
        }); 
    }
};

export const editUser = (user, history, id) => async dispatch =>{ 
    try{
        const res = await client.post(`/uz/cas/user/${id}`, user);
        dispatch({
            type: GET_MESSAGE,
            payload: res.data.body,
        });
        history.push("/admin");
    }catch(error){
        dispatch({
            type: GET_ERRORS,
            payload: error.data
        });
    }
};

export const deleteUser = (id, history) => async dispatch => {
    try{
        const res = await client.delete(`/uz/cas/user/${id}`);
        dispatch({
            type : GET_MESSAGE,
            payload : res.data.body
        });
        history.push("/admin")
    }catch(error){
        dispatch({
            type: GET_ERRORS,
            payload: error.data
        });
    }
};

export const getUser = (id) => async dispatch => {
    try{
        const res = await client.get(`/uz/cas/user/${id}`);
        dispatch({
            type : GET_USER,
            payload : res.data.body
        });
    }catch(error){
        dispatch({
            type: GET_ERRORS,
            payload: error.data,
        });
    }
}
