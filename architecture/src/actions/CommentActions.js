
import {GET_ERRORS, GET_MESSAGE} from './Types'
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