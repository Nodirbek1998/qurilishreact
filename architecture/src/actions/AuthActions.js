import axios from 'axios';
import { GET_ERRORS, GET_TOKEN } from "../actions/Types";
import jwt_decode from "jwt-decode";
import setJWToken from "../utils/setJwtToken";
import client from 'services/api';

export const getToken = (login) => async (dispatch) => { 
    try {
        const res = await client.post(
            "/uz/cas/login",
            login 
        ); 
        const token = await res.data.body; 
        setJWToken(token);
        const decode = await jwt_decode(token);
        localStorage.setItem("jwtToken", token);
        dispatch(setCurrentUser(decode));
    } catch (errors) {
    console.log(errors);
    dispatch({
        type: GET_ERRORS,
        payload: errors.data,
    });
    }
};

export const setCurrentUser = (decode) => {
    return {
        type: GET_TOKEN,
        payload: decode,
    };
};


export const logout = () => (dispatch) => {
  // Remove token from localStorage
    localStorage.removeItem("jwtToken");
  // Remove auth header from future request
    setJWToken(false);
  // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};
