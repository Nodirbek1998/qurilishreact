
import {GET_COMMENT_PRORECTOR, GET_ERRORS, GET_MESSAGE} from './Types'
import client from 'services/api';

export const addProgress = (progress) => async dispatch =>{ 
    try{
        const res = await client.post(`/uz/cas/comment`, progress);
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
export const getComentProRector = (progress) => async dispatch =>{ 
    try{
        const res = await client.post(`/uz/cas/comment/proRector`, progress);
        dispatch({ 
            type : GET_COMMENT_PRORECTOR,
            payload : res.data.body
        })
    }catch(error){
        dispatch({
            type : GET_ERRORS,
            payload : error.data
        })
    }   
}; 