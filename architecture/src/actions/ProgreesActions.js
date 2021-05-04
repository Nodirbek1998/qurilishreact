
import {GET_ERRORS, GET_MESSAGE, GET_PROGRESS} from './Types'
import client from 'services/api';

export const getProgress = (project) => async dispatch =>{
    try{
        const res = await client.post('/uz/cas/progress/getPercent', project);
        dispatch({
            type : GET_PROGRESS,
            payload : res.data.body
        })
    }catch(error){
        dispatch({
            type : GET_ERRORS,
            payload : error.data
        })
    }   
}; 
export const addPercent = (percent) => async dispatch =>{ 
    try{
        const res = await client.post(`/uz/cas/progress`, percent);
        dispatch({
            type : GET_MESSAGE,
            payload : res.data.body
        })
    }catch(error){
        dispatch({
            type : GET_ERRORS,
            payload : error.data
        })
    }   
}; 
export const pushPercent = (id, progress) => async dispatch =>{ 
    try{
        const res = await client.post(`/uz/cas/progress/add/${id}`, progress);
        dispatch({
            type : GET_MESSAGE,
            payload : res.data.body
        })
    }catch(error){
        dispatch({
            type : GET_ERRORS,
            payload : error.data
        })
    }   
}; 
export const deleteProgress = (id) => async dispatch =>{ 
    try{
        const res = await client.delete(`/uz/cas/progress/${id}`);
        dispatch({
            type : GET_MESSAGE,
            payload : res.data.body
        })
    }catch(error){
        dispatch({
            type : GET_ERRORS,
            payload : error.data
        })
    }   
}; 
