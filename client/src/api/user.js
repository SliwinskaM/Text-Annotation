import axios from 'axios';

const urlPosts = 'http://localhost:27017/login';

export const fetchUser = (user) => axios.post(urlPosts, user);
export const fetchUsers = () => axios.post(urlPosts);
// export const deleteRelation = (id) => axios.delete(`${urlPosts}/${id}`);