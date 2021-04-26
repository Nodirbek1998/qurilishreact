import axios from 'axios';
import { GET_ERRORS, GET_MESSAGE, GET_PROJECTS } from './Types';
import client from 'services/api';
export const getProjects = () => async dispatch =>{
    try{
        const res = await client.get("/uz/cas/project/all");
        dispatch({
            type: GET_PROJECTS,
            payload : res.data.body
        })
    } catch(error){
        dispatch({
            type : GET_ERRORS,
            payload : error.data
        })
    }
};

export const createProject = (project) => async dispatch =>{
    try{
        const res = await axios.post("https://architecture-manager-web.herokuapp.com/uz/cas/project", project); console.log(res)
        dispatch({
            type: GET_MESSAGE,
            payload : res.data.body
        })
    } catch(error){
        dispatch({
            type : GET_ERRORS,
            payload : error.data
        })
    }
};
export const deleteProject = (id) => async dispatch =>{
    try{
        const res = await axios.delete(`https://architecture-manager-web.herokuapp.com/uz/cas/project/${id}`); console.log(res)
        dispatch({
            type: GET_MESSAGE,
            payload : res.data.body
        })
    } catch(error){
        dispatch({
            type : GET_ERRORS,
            payload : error.data
        })
    }
};

export const editProject = (id, project) => async dispatch =>{ console.log(id, project)
    try{
        const res = await axios.put(`https://architecture-manager-web.herokuapp.com/uz/cas/project/${id}`, project); 
        dispatch({
            type: GET_MESSAGE,
            payload : res.data.body
        })
    } catch(error){
        dispatch({
            type : GET_ERRORS,
            payload : error.data
        })
    }
};
export const getProjectusername = (username) => async dispatch =>{ 
    try{
        const res = await axios.post(`https://architecture-manager-web.herokuapp.com/uz/cas/project/user`, {"username" : username}); 
        dispatch({
            type: GET_PROJECTS,
            payload : res.data.body
        })
    } catch(error){
        dispatch({
            type : GET_ERRORS,
            payload : error.data
        })
    }
};

export const getAllProject = () => async dispatch =>{ 
    try{
        const res = await axios.get(`https://architecture-manager-web.herokuapp.com/uz/cas/project/all`); 
        dispatch({
            type: GET_PROJECTS,
            payload : res.data.body
        })
    } catch(error){
        dispatch({
            type : GET_ERRORS,
            payload : error.data
        })
    }
};