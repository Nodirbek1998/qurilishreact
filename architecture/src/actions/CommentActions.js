import axios from 'axios';
import {GET_ERRORS, GET_MESSAGE} from './Types'
import client from 'services/api';

export const addProgress = (progress) => async dispatch =>{ console.log( progress)
    try{
        const res = await client.post(`/uz/cas/comment`, progress);
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