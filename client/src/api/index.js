import axios from 'axios';

const urlPosts = 'http://localhost:27017/posts';

export const fetchDocuments = () => axios.get(urlPosts);
export const createDocument = (newPost) => axios.post(urlPosts, newPost);
export const deleteDocument = (id) => axios.delete(`${urlPosts}/${id}`);
