import axios from 'axios';

const urlPosts = 'http://localhost:27017/posts';

export const fetchDocuments = () => axios.get(urlPosts);
export const createDocument = (newPost) => axios.post(urlPosts, newPost);
export const deleteDocument = (id) => axios.delete(`${urlPosts}/${id}`);

const urlLabels = 'http://localhost:27017/labels';
export const fetchLabels = () => axios.get(urlLabels);
export const createLabel = (newLabel) => axios.post(urlLabels, newLabel);
export const deleteLabel = (id) => axios.delete(`${urlLabels}/${id}`);
