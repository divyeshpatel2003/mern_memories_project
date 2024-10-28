import axios from "axios";

const url = "http://localhost:5000/posts";

export const fetch_posts = () => axios.get(url);
export const create_post = (new_post) => axios.post(url, new_post);
export const update_post = (id, update_post) => axios.patch(`${url}/${id}`, update_post);
export const delete_post = (id) => axios.delete(`${url}/${id}`);
export const like_post = (id) => axios.patch(`${url}/${id}/likePost`)