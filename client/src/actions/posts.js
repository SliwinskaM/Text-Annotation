import { FETCH_ALL, CREATE, DELETE } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getDocuments = () => async (dispatch) => {
  try {
    const { data } = await api.fetchDocuments();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createDocument = (post) => async (dispatch) => {
  try {
    const { data } = await api.createDocument(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteDocument = (id) => async (dispatch) => {
  try {
    await api.deleteDocument(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
