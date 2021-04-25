import axios from 'axios';
import {GET_ERRORS, GET_MESSAGE} from './Types'


export const addProgress = (progress) => async dispatch =>{ console.log( progress)
    try{
        const res = await axios.post(`uz/cas/comment`, progress);
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