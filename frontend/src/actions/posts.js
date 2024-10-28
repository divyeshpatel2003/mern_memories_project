import { FETCH_ALL, UPDATE, CREATE, DELETE, LIKE } from ".././constants/actionTypes"

import * as api from '../api/index';

export const get_posts = () => async(dispatch) =>{
    try {
        const {data} = await api.fetch_posts();

        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message)
    }
}
export const create_post = (post) => async(dispatch) =>{
    try {
        const {data} = await api.create_post(post);

        dispatch({type: CREATE, payload: data})
    } catch (error) {
        console.log(error.message)
    }
    
}
export const update_post = (id, post) =>  async (dispatch) =>{
    try {
        const {data} = await api.update_post(id, post);
                
        dispatch({type: UPDATE, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}


export const delete_post = (id) =>  async (dispatch) =>{
    try {
        await api.delete_post(id);  
                
        dispatch({type: DELETE, payload: id})
    } catch (error) {
        console.log(error.message)
    }
}

export const like_post = (id) => async (dispatch) =>{
    try {
        const {data} = await api.like_post(id)

        dispatch({type: LIKE, payload: data})
    } catch (error) {
        console.log(error.message)        
    }
}