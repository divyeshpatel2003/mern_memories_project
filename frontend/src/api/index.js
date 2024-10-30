import axios from "axios";

// const url = "http://localhost:5000/posts";
const API = axios.create({baseURL  : "http://localhost:5000"})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = ` Bearer ${JSON.parse(localStorage.getItem("profile")).token} `
    }
    return req
})

export const fetch_posts = () => API.get("/posts");
export const create_post = (new_post) => API.post("/posts", new_post);
export const update_post = (id, update_post) => API.patch(`/posts/${id}`, update_post);
export const delete_post = (id) => API.delete(`/posts/${id}`);
export const like_post = (id) => API.patch(`/posts/${id}/likePost`)

export const sign_up  = (form_data) => API.post('/user/signup', form_data)
export const sign_in  = (form_data) => API.post('/user/signin', form_data)