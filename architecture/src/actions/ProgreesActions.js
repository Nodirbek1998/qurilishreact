import axios from 'axios';
import {GET_ERRORS, GET_MESSAGE, GET_PROGRESS} from './Types'
import client from 'services/api';
export const getProgress = (project) => async dispatch =>{ console.log( project)
    try{
        const res = await client.post('/uz/cas/progress/getPercent', project);
        console.log(res);
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
export const addPercent = (percent) => async dispatch =>{ console.log(percent)
    try{
        const res = await axios.post(`https://architecture-manager-web.herokuapp.com/uz/cas/progress`, percent);
        console.log(res);
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
export const pushPercent = (id) => async dispatch =>{ console.log(id)
    try{
        const res = await axios.get(`https://architecture-manager-web.herokuapp.com/uz/cas/progress/add/${id}`);
        console.log(res);
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
