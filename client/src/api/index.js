import axios from 'axios';

const url = 'http://localhost:27017/posts';

export const fetchDocuments = () => axios.get(url);
export const createDocument = (newPost) => axios.post(url, newPost);
export const deleteDocument = (id) => axios.delete(`${url}/${id}`);
