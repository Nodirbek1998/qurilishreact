
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
export const activesProject = () => async dispatch =>{
    try{
        const res = await client.get("/uz/cas/project/active");
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
export const inProgressProject = () => async dispatch =>{
    try{
        const res = await client.get("/uz/cas/project/inProgress");
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
export const finishedProject = () => async dispatch =>{
    try{
        const res = await client.get("/uz/cas/project/finished");
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
        const res = await client.post("/uz/cas/project", project); 
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
        const res = await client.delete(`/uz/cas/project/${id}`);
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

export const editProject = (id, project) => async dispatch =>{ 
    try{
        const res = await client.put(`/uz/cas/project/${id}`, project); 
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
export const getProjectusername = (username) => async dispatch =>{  console.log(username)
    try{
        const res = await client.post(`/uz/cas/project/user`, {"username" : username}); 
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
        const res = await client.get(`/uz/cas/project/all`); 
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
export const activeProject = (id) => async dispatch =>{ 
    try{
        const res = await client.get(`/uz/cas/project/active/${id}`); 
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
export const addDocument = (document) => async dispatch =>{ 
    try{
        const res = await client.post(`/uz/cas/project/${document.projectId}`, document); 
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