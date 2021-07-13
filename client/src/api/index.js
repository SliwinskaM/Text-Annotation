import axios from 'axios';

const urlPosts = 'http://localhost:27017/posts';

export const fetchDocuments = () => axios.get(urlPosts);
export const createDocument = (newPost) => axios.post(urlPosts, newPost);
export const deleteDocument = (id) => axios.delete(`${urlPosts}/${id}`);
<<<<<<< HEAD


const urlLabels = 'http://localhost:27017/labels';
export const fetchLabels = () => axios.get(urlLabels);
export const createLabel = (newLabel) => axios.post(urlLabels, newLabel);
export const deleteLabel = (id) => axios.delete(`${urlLabels}/${id}`);

const urlCollections = 'http://localhost:27017/collections';
export const getCollections = () =>axios.get(urlCollections);


=======
>>>>>>> 639784b9c0780481c086d4e253d9aae3f65b9dba
