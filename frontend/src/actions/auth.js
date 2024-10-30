import { AUTH } from "../constants/actionTypes";

import * as api from "../api/index"

export const sign_in = (form_data, navigate) => async (dispatch) =>{
    try {
        const {data} = await api.sign_in(form_data)
        dispatch({type: AUTH, data})

        navigate('/')
    } catch (error) {
        console.log(error)
    }
}
export const sign_up = (form_data, navigate) => async (dispatch) =>{
    try {
        const {data} = await api.sign_up(form_data)
        dispatch({type: AUTH, data})

        navigate('/') 
    } catch (error) {
        console.log(error)
    }
}